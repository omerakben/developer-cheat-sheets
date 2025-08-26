import { CheatSheet } from "@/types/cheatsheet";

export const typescriptCheatSheet: CheatSheet = {
  title: "TypeScript Cheat Sheet",
  description:
    "Strategic TypeScript guide • Security-first approach • Type safety • Performance patterns • Best practices",
  sections: [
    {
      id: "security-validation",
      title: "Security & Input Validation",
      description:
        "Type safety as security • Input validation patterns • Prevent runtime errors • Secure API handling",
      examples: [
        {
          title: "Type-Safe Input Validation",
          description:
            "Use TypeScript types for validation • Prevent injection attacks • Validate external data • Runtime type checking",
          language: "typescript",
          code: `// 🔒 SECURITY: Type-safe input validation
// Type guards for runtime validation
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isValidEmail(value: unknown): value is string {
  if (!isString(value)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUserId(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

// ✅ Secure user input validation
interface UserInput {
  name: string;
  email: string;
  age: number;
}

function validateUserInput(input: unknown): UserInput | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const data = input as Record<string, unknown>;

  // Validate each field with type guards
  if (!isString(data.name) || data.name.trim().length === 0) {
    return null;
  }

  if (!isValidEmail(data.email)) {
    return null;
  }

  if (!isValidUserId(data.age) || data.age < 0 || data.age > 150) {
    return null;
  }

  return {
    name: data.name.trim(),
    email: data.email.toLowerCase(),
    age: data.age
  };
}

// 🔒 Safe string operations to prevent XSS
function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ✅ Type-safe API response validation
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

function validateApiResponse<T>(
  response: unknown,
  validator: (data: unknown) => data is T
): ApiResponse<T> | null {
  if (!response || typeof response !== "object") {
    return null;
  }

  const resp = response as Record<string, unknown>;

  if (typeof resp.success !== "boolean") {
    return null;
  }

  if (!validator(resp.data)) {
    return null;
  }

  return resp as ApiResponse<T>;
}

// 💡 WHEN TO USE:
// - Always validate external input (forms, APIs, files)
// - Use type guards for runtime type checking
// - Sanitize data before displaying in DOM
// - Validate API responses before using data`,
        },
        {
          title: "Secure API Patterns",
          description:
            "Type-safe HTTP requests • Error handling • Input sanitization • Prevent injection attacks",
          language: "typescript",
          code: `// 🔒 Secure API client with proper typing
class SecureApiClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(apiKey && { 'Authorization': \`Bearer \${apiKey}\` })
    };
  }

  // ✅ Type-safe GET request with validation
  async get<T>(
    endpoint: string, 
    validator: (data: unknown) => data is T
  ): Promise<T | null> {
    try {
      const url = new URL(endpoint, this.baseUrl);
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.defaultHeaders,
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      // Validate response structure
      if (!validator(data)) {
        throw new Error('Invalid response structure');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return null;
    }
  }

  // ✅ Secure POST with input validation
  async post<TInput, TOutput>(
    endpoint: string,
    data: TInput,
    inputValidator: (data: TInput) => boolean,
    outputValidator: (data: unknown) => data is TOutput
  ): Promise<TOutput | null> {
    // Validate input before sending
    if (!inputValidator(data)) {
      throw new Error('Invalid input data');
    }

    try {
      const url = new URL(endpoint, this.baseUrl);
      
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const result = await response.json();
      
      if (!outputValidator(result)) {
        throw new Error('Invalid response structure');
      }

      return result;
    } catch (error) {
      console.error('API request failed:', error);
      return null;
    }
  }
}

// 🔒 Environment variable validation
interface Config {
  apiUrl: string;
  apiKey: string;
  environment: 'development' | 'production' | 'test';
}

function validateConfig(): Config {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.API_KEY;
  const environment = process.env.NODE_ENV;

  if (!apiUrl || !isString(apiUrl)) {
    throw new Error('NEXT_PUBLIC_API_URL is required');
  }

  if (!apiKey || !isString(apiKey)) {
    throw new Error('API_KEY is required');
  }

  if (!environment || !['development', 'production', 'test'].includes(environment)) {
    throw new Error('Invalid NODE_ENV');
  }

  return {
    apiUrl,
    apiKey,
    environment: environment as Config['environment']
  };
}

// Usage example with validation
const config = validateConfig();
const apiClient = new SecureApiClient(config.apiUrl, config.apiKey);

// 💡 SECURITY BEST PRACTICES:
// - Always validate input and output data
// - Use type guards for runtime type checking
// - Sanitize data before displaying
// - Validate environment variables at startup
// - Use proper error handling and logging`,
        },
      ],
    },
    {
      id: "performance-optimization",
      title: "Performance & Memory Optimization",
      description:
        "Efficient TypeScript patterns • Memory management • Algorithm optimization • Bundle size reduction",
      examples: [
        {
          title: "Memory-Efficient Patterns",
          description:
            "Avoid memory leaks • Use proper cleanup • Efficient data structures • Lazy loading strategies",
          language: "typescript",
          code: `// ⚡ MEMORY: Efficient data processing patterns
// Use generators for large datasets
function* processLargeDataset<T>(data: T[]): Generator<T, void, unknown> {
  for (const item of data) {
    // Process one item at a time - memory efficient
    yield item;
  }
}

// ✅ Lazy loading with async iterators
async function* fetchDataInChunks(
  urls: string[], 
  chunkSize: number = 10
): AsyncGenerator<Response[], void, unknown> {
  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize);
    const responses = await Promise.all(
      chunk.map(url => fetch(url))
    );
    yield responses;
  }
}

// ⚡ Efficient string concatenation
function buildReport(items: string[]): string {
  // ✅ Join is much faster than repeated concatenation
  return items.join('\\n');
}

function buildReportSlow(items: string[]): string {
  // ❌ Inefficient - creates new string each time
  let result = '';
  for (const item of items) {
    result += item + '\\n';
  }
  return result;
}

// 🧠 Memory leak prevention
class DataProcessor {
  private cache = new Map<string, any>();
  private listeners: Array<() => void> = [];

  // ✅ Proper cleanup method
  cleanup(): void {
    this.cache.clear();
    this.listeners.length = 0; // Clear array efficiently
  }

  // ✅ WeakMap for object associations (auto garbage collection)
  private weakCache = new WeakMap<object, string>();

  processObject(obj: object): string {
    if (this.weakCache.has(obj)) {
      return this.weakCache.get(obj)!;
    }
    
    const result = \`processed-\${Date.now()}\`;
    this.weakCache.set(obj, result);
    return result;
  }
}

// ⚡ Efficient array operations
class OptimizedArrayOps {
  // ✅ Use Set for fast membership testing O(1) vs O(n)
  static findCommonItems<T>(arr1: T[], arr2: T[]): T[] {
    const set1 = new Set(arr1);
    return arr2.filter(item => set1.has(item));
  }

  // ✅ Batch operations for better performance
  static processInBatches<T, R>(
    items: T[],
    processor: (item: T) => R,
    batchSize: number = 1000
  ): R[] {
    const results: R[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = batch.map(processor);
      results.push(...batchResults);
      
      // Allow other tasks to run
      if (i % (batchSize * 10) === 0) {
        // Use setTimeout to yield control
        return new Promise(resolve => {
          setTimeout(() => resolve(results), 0);
        }) as any;
      }
    }
    
    return results;
  }
}

// 💡 MEMORY OPTIMIZATION TIPS:
// - Use generators for large datasets
// - Clear unused references explicitly
// - Use WeakMap/WeakSet for object associations
// - Process data in chunks to avoid memory spikes
// - Use Set for fast membership testing`,
        },
        {
          title: "Type System Performance",
          description:
            "Optimize TypeScript compilation • Efficient type checking • Bundle size optimization • Tree shaking",
          language: "typescript",
          code: `// ⚡ COMPILATION: Optimize TypeScript performance
// Use literal types for better tree shaking
type SupportedLanguages = 'en' | 'es' | 'fr' | 'de';

// ✅ Const assertions for better inference
const SUPPORTED_FORMATS = ['json', 'csv', 'xml'] as const;
type SupportedFormat = typeof SUPPORTED_FORMATS[number];

// ⚡ Interface merging for better performance
interface BaseConfig {
  readonly apiUrl: string;
  readonly timeout: number;
}

// Extend instead of intersection for better performance
interface DevelopmentConfig extends BaseConfig {
  readonly debug: true;
  readonly verbose: true;
}

interface ProductionConfig extends BaseConfig {
  readonly debug: false;
  readonly minify: true;
}

// ✅ Conditional types for efficient type narrowing
type ConfigByEnv<T extends 'dev' | 'prod'> = 
  T extends 'dev' ? DevelopmentConfig : ProductionConfig;

// ⚡ Lazy type loading with dynamic imports
type ComponentType = () => Promise<{ default: React.ComponentType<any> }>;

const lazyComponents: Record<string, ComponentType> = {
  Dashboard: () => import('./Dashboard'),
  Profile: () => import('./Profile'),
  Settings: () => import('./Settings'),
};

// ✅ Efficient generic constraints
interface Serializable {
  toJSON(): string;
}

// Better than \`extends any\` for performance
function serialize<T extends Serializable>(obj: T): string {
  return obj.toJSON();
}

// ⚡ Bundle optimization with tree shaking
// Use named exports for better tree shaking
export { validateUserInput, sanitizeHtml } from './validators';
export { OptimizedArrayOps } from './array-utils';

// ❌ Avoid default exports for utilities (worse tree shaking)
// export default { validateUserInput, sanitizeHtml };

// ✅ Conditional loading based on environment
const isProduction = process.env.NODE_ENV === 'production';

// Only include development tools in dev builds
const devTools = !isProduction ? {
  logger: () => import('./dev-logger'),
  profiler: () => import('./dev-profiler'),
} : {};

// ⚡ Efficient utility types
// Use mapped types sparingly in hot paths
type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// More efficient for simple cases
type PartialUser = {
  id?: number;
  name?: string;
  email?: string;
};

// 💡 PERFORMANCE BEST PRACTICES:
// - Use const assertions for literal types
// - Prefer interfaces over type intersections
// - Use dynamic imports for code splitting
// - Optimize bundle size with proper exports
// - Avoid complex generic constraints in hot paths`,
        },
      ],
    },
    {
      id: "basics",
      title: "TypeScript Fundamentals",
      description:
        "Strategic type usage • Security through type safety • Performance considerations • Best practices",
      examples: [
        {
          title: "Strategic Type Usage",
          description: "Type safety as security • Choose appropriate types • Avoid common pitfalls • Performance considerations",
          language: "typescript",
          code: `// ✅ SECURITY: Prefer specific types over any
// ❌ Avoid: Loses type safety and opens security holes
let userInput: any = getUserInput(); // Could be anything!

// ✅ Use: Proper typing with validation
interface UserInput {
  name: string;
  email: string;
  age: number;
}

function processUserInput(input: unknown): UserInput | null {
  // Type validation prevents runtime errors
  if (!input || typeof input !== 'object') return null;
  
  const data = input as Record<string, unknown>;
  
  if (typeof data.name !== 'string' || 
      typeof data.email !== 'string' || 
      typeof data.age !== 'number') {
    return null;
  }
  
  return data as UserInput;
}

// ⚡ PERFORMANCE: Use literal types for better optimization
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'; // Better than string
type UserRole = 'admin' | 'user' | 'guest'; // Enables tree shaking

// ✅ Const assertions for immutable data
const API_ENDPOINTS = {
  users: '/api/users',
  auth: '/api/auth',
  settings: '/api/settings'
} as const; // Readonly and literal types

type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

// 🔒 SAFETY: Strict null checks prevent common errors
function getUserName(user: User | null): string {
  // TypeScript forces null checking
  if (!user) {
    return 'Anonymous';
  }
  return user.name; // Safe to access
}

// ⚡ Union types for efficient data structures
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string };

// TypeScript can narrow types automatically
function handleState(state: LoadingState) {
  switch (state.status) {
    case 'success':
      // state.data is available here
      console.log(state.data);
      break;
    case 'error':
      // state.error is available here
      console.log(state.error);
      break;
  }
}

// 💡 WHEN TO USE:
// - unknown over any for external data
// - Literal types for known values
// - Union types for state management
// - Const assertions for configuration`,
        },
        {
          title: "Interfaces and Type Aliases",
          description: "Defining custom types and object structures",
          language: "typescript",
          code: `// Interface definition
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
  readonly createdAt: Date; // Read-only property
}

// Extending interfaces
interface AdminUser extends User {
  permissions: string[];
  lastLogin: Date;
}

// Type aliases
type Status = "pending" | "approved" | "rejected";
type UserRole = "admin" | "user" | "guest";

// Function types
type EventHandler = (event: Event) => void;
type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

// Index signatures
interface Dictionary {
  [key: string]: any;
}

// Using types
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date()
};

const response: ApiResponse<User[]> = {
  data: [user],
  success: true
};`,
        },
        {
          title: "Functions and Type Safety",
          description: "Function signatures, parameters, and return types",
          language: "typescript",
          code: `// Function declarations
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow functions with types
const add = (x: number, y: number): number => x + y;

// Optional and default parameters
function createUser(
  name: string,
  age?: number,
  isActive: boolean = true
): User {
  return {
    id: Math.random(),
    name,
    email: \`\${name.toLowerCase()}@example.com\`,
    isActive,
    createdAt: new Date()
  };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Function overloads
function process(input: string): string;
function process(input: number): number;
function process(input: string | number): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input * 2;
}

// Generic functions
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>("hello");
const numberResult = identity<number>(42);`,
        },
        {
          title: "Classes and Access Modifiers",
          description: "Object-oriented programming with TypeScript classes",
          language: "typescript",
          code: `// Class with access modifiers
class User {
  public readonly id: number;
  private password: string;
  protected email: string;

  constructor(
    id: number,
    email: string,
    private name: string // Parameter property
  ) {
    this.id = id;
    this.email = email;
    this.password = this.generatePassword();
  }

  // Public method
  public getName(): string {
    return this.name;
  }

  // Private method
  private generatePassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  // Protected method
  protected validateEmail(email: string): boolean {
    return email.includes("@");
  }

  // Static method
  static createGuest(): User {
    return new User(0, "guest@example.com", "Guest");
  }
}

// Abstract class
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

// Class implementing interface
interface Flyable {
  fly(): void;
}

class Bird extends Animal implements Flyable {
  makeSound(): void {
    console.log("Chirp!");
  }

  fly(): void {
    console.log("Flying...");
  }
}`,
        },
      ],
    },
    {
      id: "advanced",
      title: "Advanced TypeScript",
      description: "Strategic type patterns • Compile-time safety • Advanced generics • Type-level programming",
      examples: [
        {
          title: "Generics and Constraints",
          description: "Generic types with constraints and conditional logic",
          language: "typescript",
          code: `// Basic generics
interface Container<T> {
  value: T;
  getValue(): T;
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Using multiple type parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type ApiResult<T> = T extends string ? string[] : number[];

// Mapped types
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Key remapping
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// Result: { getName: () => string; getEmail: () => string; ... }`,
        },
        {
          title: "Utility Types",
          description:
            "Built-in TypeScript utility types for type transformations",
          language: "typescript",
          code: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

// Required - makes all properties required
type RequiredUser = Required<PartialUser>;

// Pick - selects specific properties
type PublicUser = Pick<User, "id" | "name" | "email">;
// { id: number; name: string; email: string; }

// Omit - excludes specific properties
type UserWithoutPassword = Omit<User, "password">;
// { id: number; name: string; email: string; role: "admin" | "user"; }

// Record - creates type with specific keys and values
type UserRoles = Record<"admin" | "moderator" | "user", string[]>;
// { admin: string[]; moderator: string[]; user: string[]; }

// Extract and Exclude
type AdminRole = Extract<User["role"], "admin">; // "admin"
type NonAdminRole = Exclude<User["role"], "admin">; // "user"

// ReturnType and Parameters
function getUser(id: number): Promise<User> {
  return Promise.resolve({} as User);
}

type GetUserReturn = ReturnType<typeof getUser>; // Promise<User>
type GetUserParams = Parameters<typeof getUser>; // [number]

// Awaited - unwraps Promise types
type UserData = Awaited<GetUserReturn>; // User

// NonNullable - removes null and undefined
type SafeString = NonNullable<string | null | undefined>; // string`,
        },
        {
          title: "Mapped Types and Template Literals",
          description:
            "Advanced type manipulation with mapped types and template literal types",
          language: "typescript",
          code: `// Template literal types
type EventName = "click" | "focus" | "blur";
type HandlerName = \`on\${Capitalize<EventName>}\`;
// Result: "onClick" | "onFocus" | "onBlur"

// Template literal patterns
type CSSProperties = "margin" | "padding" | "border";
type CSSUnits = "px" | "rem" | "em" | "%";
type CSSValue = \`\${number}\${CSSUnits}\`;

// Advanced mapped types
type EventHandlers<T extends Record<string, any>> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

interface FormData {
  username: string;
  email: string;
  age: number;
}

type FormHandlers = EventHandlers<FormData>;
// {
//   onUsername: (value: string) => void;
//   onEmail: (value: string) => void;
//   onAge: (value: number) => void;
// }

// Recursive mapped types
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Conditional mapped types
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

// Key filtering
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type StringProperties = PickByType<User, string>;
// { name: string; email: string; }`,
        },
        {
          title: "Type Guards and Narrowing",
          description: "Runtime type checking and type narrowing techniques",
          language: "typescript",
          code: `// Type predicates
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isUser(obj: any): obj is User {
  return obj &&
         typeof obj.id === "number" &&
         typeof obj.name === "string" &&
         typeof obj.email === "string";
}

// Using type guards
function processValue(value: unknown) {
  if (isString(value)) {
    // value is narrowed to string
    console.log(value.toUpperCase());
  }

  if (isUser(value)) {
    // value is narrowed to User
    console.log(value.name);
  }
}

// Discriminated unions
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: User[];
}

interface ErrorState {
  status: "error";
  message: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

// Type narrowing with discriminated unions
function handleState(state: AsyncState) {
  switch (state.status) {
    case "loading":
      console.log("Loading...");
      break;
    case "success":
      // state.data is available here
      console.log(state.data.length);
      break;
    case "error":
      // state.message is available here
      console.log(state.message);
      break;
  }
}

// in operator narrowing
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // animal is Fish
  } else {
    animal.fly(); // animal is Bird
  }
}

// instanceof narrowing
function processError(error: unknown) {
  if (error instanceof Error) {
    console.log(error.message); // error is Error
  }
}`,
        },
      ],
    },
    {
      id: "react",
      title: "TypeScript with React",
      description: "Secure React patterns • Type-safe components • Performance optimization • Error boundaries",
      examples: [
        {
          title: "React Component Types",
          description: "Typing React components, props, and children",
          language: "tsx",
          code: `import React from 'react';

// Basic component props
interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

// Function component with props
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false
}) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Component with generic props
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Using the generic component
const UserList = () => {
  const users: User[] = [
    { id: 1, name: "John", email: "john@example.com", createdAt: new Date() }
  ];

  return (
    <List
      items={users}
      keyExtractor={(user) => user.id}
      renderItem={(user) => <span>{user.name}</span>}
    />
  );
};

// Component with forwarded ref
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} {...props} />
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);`,
        },
        {
          title: "Secure React Patterns",
          description:
            "Input sanitization • XSS prevention • Type-safe event handling • Secure data rendering",
          language: "tsx",
          code: `import React, { useState, useCallback } from 'react';
import DOMPurify from 'dompurify';

// 🔒 SECURITY: Safe HTML rendering component
interface SafeHtmlProps {
  content: string;
  className?: string;
  allowedTags?: string[];
}

const SafeHtml: React.FC<SafeHtmlProps> = ({ 
  content, 
  className,
  allowedTags = ['b', 'i', 'em', 'strong'] 
}) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: [],
  });

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

// ✅ Type-safe form with validation
interface UserFormData {
  name: string;
  email: string;
  message: string;
}

interface ValidationErrors {
  [K in keyof UserFormData]?: string;
}

const SecureContactForm: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  // ✅ Input validation with type safety
  const validateField = useCallback((field: keyof UserFormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\\s]+$/.test(value)) return 'Name can only contain letters and spaces';
        break;
      case 'email':
        if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) return 'Invalid email format';
        break;
      case 'message':
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.length > 1000) return 'Message too long (max 1000 characters)';
        break;
    }
    return undefined;
  }, []);

  // 🔒 Secure input handler with sanitization
  const handleInputChange = useCallback((field: keyof UserFormData) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      
      // Basic sanitization - remove potential XSS patterns
      const sanitizedValue = value
        .replace(/<script[^>]*>.*?<\\/script>/gi, '')
        .replace(/<[^>]*>/g, '');

      setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
      
      // Real-time validation
      const error = validateField(field, sanitizedValue);
      setErrors(prev => ({ ...prev, [field]: error }));
    }, [validateField]);

  // ✅ Secure form submission
  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate all fields
    const newErrors: ValidationErrors = {};
    (Object.keys(formData) as Array<keyof UserFormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Send to secure API endpoint
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }

        // Reset form on success
        setFormData({ name: '', email: '', message: '' });
        alert('Message sent successfully!');
      } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to send message. Please try again.');
      }
    }
  }, [formData, validateField]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <span id="name-error" className="error">{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <span id="email-error" className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleInputChange('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <span id="message-error" className="error">{errors.message}</span>}
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
};

// 💡 SECURITY BEST PRACTICES:
// - Always validate and sanitize user input
// - Use type-safe event handlers
// - Implement proper error handling
// - Use DOMPurify for safe HTML rendering
// - Include ARIA attributes for accessibility`,
        },
        {
          title: "React Hooks with TypeScript",
          description: "Typing React hooks for type-safe state management",
          language: "tsx",
          code: `import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// useState with explicit types
const UserComponent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  // useEffect with cleanup
  useEffect(() => {
    let isCancelled = false;

    async function fetchUser() {
      try {
        const response = await fetch('/api/user');
        const userData: User = await response.json();

        if (!isCancelled) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    return () => {
      isCancelled = true;
    };
  }, []);

  // useCallback with proper typing
  const handleUserUpdate = useCallback((updatedUser: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      return { ...prevUser, ...updatedUser };
    });
  }, []);

  // useMemo with computed values
  const sortedUsers = useMemo(() => {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  // useRef with DOM elements
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

// Custom hooks with TypeScript
interface UseApiOptions {
  immediate?: boolean;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      const result: T = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [fetchData, options.immediate]);

  return { data, loading, error, refetch: fetchData };
}`,
        },
        {
          title: "React Context and Providers",
          description: "Type-safe React Context with TypeScript",
          language: "tsx",
          code: `import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Auth context types
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

// Create context with undefined default (requires provider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { user, token } = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const refreshToken = async (): Promise<void> => {
    // Implementation here
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Usage in components
const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login('user@example.com', 'password');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form implementation */}
    </form>
  );
};`,
        },
        {
          title: "Event Handlers and Form Types",
          description: "Typing React events and form interactions",
          language: "tsx",
          code: `import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  age: number;
  terms: boolean;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: 0,
    terms: false,
  });

  // Input change handler
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
              type === 'number' ? Number(value) : value,
    }));
  };

  // Select change handler
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Textarea change handler
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submission handler
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
      }
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  // Button click handlers
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked:', event.currentTarget.name);
  };

  const handleDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('Div clicked:', event.clientX, event.clientY);
  };

  // Keyboard event handler
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      console.log('Ctrl+Enter pressed');
    }
  };

  // Focus and blur handlers
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input focused:', event.target.name);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input blurred:', event.target.name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Your name"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Your email"
      />

      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        placeholder="Your age"
      />

      <label>
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleInputChange}
        />
        I agree to the terms
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={handleButtonClick}>
        Cancel
      </button>
    </form>
  );
};

// Generic event handler type
type EventHandler<T = HTMLElement> = (event: React.MouseEvent<T>) => void;

interface IconButtonProps {
  icon: React.ComponentType;
  onClick: EventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      <Icon />
    </button>
  );
};`,
        },
      ],
    },
    {
      id: "config",
      title: "Configuration & Tools",
      description: "TypeScript configuration, tooling, and development setup",
      examples: [
        {
          title: "tsconfig.json Configuration",
          description: "Essential TypeScript compiler configuration options",
          language: "json",
          code: `{
  "compilerOptions": {
    // Basic options
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,

    // Module resolution
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    // Advanced options
    "incremental": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,

    // Path mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"]
    },

    // JSX configuration
    "jsx": "react-jsx",
    "jsxImportSource": "react",

    // Output
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },

  "include": [
    "src/**/*",
    "**/*.ts",
    "**/*.tsx"
  ],

  "exclude": [
    "node_modules",
    "dist",
    "build",
    "**/*.test.ts",
    "**/*.test.tsx"
  ],

  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}`,
        },
        {
          title: "ESLint + TypeScript Configuration",
          description:
            "ESLint setup for TypeScript projects with recommended rules",
          language: "json",
          code: `// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.json"],
    "tsconfigRootDir": "__dirname"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    // TypeScript specific rules
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-non-null-assertion": "warn",

    // General rules
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-template": "error"
  },
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ]
}

// package.json scripts
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit"
  }
}`,
        },
        {
          title: "Type Declarations and Ambient Modules",
          description:
            "Creating and managing type declarations for external libraries",
          language: "typescript",
          code: `// types/global.d.ts - Global type declarations
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void;
    dataLayer: any[];
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_API_URL: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

export {};

// types/modules.d.ts - Module declarations
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module 'my-untyped-library' {
  export interface LibraryConfig {
    apiKey: string;
    timeout?: number;
  }

  export class LibraryClient {
    constructor(config: LibraryConfig);
    getData(id: string): Promise<any>;
  }

  export function createClient(config: LibraryConfig): LibraryClient;
}

// types/api.d.ts - API type declarations
declare namespace API {
  interface BaseResponse {
    success: boolean;
    message?: string;
    timestamp: string;
  }

  interface PaginatedResponse<T> extends BaseResponse {
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }

  interface ErrorResponse extends BaseResponse {
    success: false;
    error: {
      code: string;
      details?: Record<string, any>;
    };
  }

  namespace Users {
    interface GetUsersResponse extends PaginatedResponse<User> {}

    interface CreateUserRequest {
      name: string;
      email: string;
      role?: UserRole;
    }

    interface CreateUserResponse extends BaseResponse {
      data: User;
    }
  }
}

// Usage with ambient module augmentation
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}`,
        },
        {
          title: "Strategic Testing Patterns",
          description:
            "Type-safe testing • Mock external dependencies • Test error conditions • Test-driven development",
          language: "typescript",
          code: `// ✅ Testable function design with clear types
interface UserScore {
  userId: number;
  score: number;
  bonusMultiplier: number;
  timestamp: Date;
}

function calculateUserScore(
  userId: number, 
  actions: string[], 
  bonusMultiplier: number = 1.0
): UserScore {
  if (userId <= 0) {
    throw new Error("Invalid user ID");
  }

  if (bonusMultiplier < 0) {
    throw new Error("Bonus multiplier cannot be negative");
  }

  const baseScore = actions.length * 10;
  const finalScore = Math.floor(baseScore * bonusMultiplier);

  return {
    userId,
    score: finalScore,
    bonusMultiplier,
    timestamp: new Date()
  };
}

// ✅ Comprehensive test suite with Jest
describe('calculateUserScore', () => {
  // Test normal cases
  it('should calculate score correctly for valid input', () => {
    const result = calculateUserScore(123, ['login', 'view', 'purchase']);
    
    expect(result.userId).toBe(123);
    expect(result.score).toBe(30); // 3 actions * 10 points
    expect(result.bonusMultiplier).toBe(1.0);
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  // Test edge cases
  it('should handle empty actions array', () => {
    const result = calculateUserScore(123, []);
    expect(result.score).toBe(0);
  });

  // Test error conditions
  it('should throw error for invalid user ID', () => {
    expect(() => {
      calculateUserScore(-1, ['action']);
    }).toThrow('Invalid user ID');
  });

  it('should throw error for negative bonus multiplier', () => {
    expect(() => {
      calculateUserScore(123, ['action'], -0.5);
    }).toThrow('Bonus multiplier cannot be negative');
  });

  // Test with bonus multiplier
  it('should apply bonus multiplier correctly', () => {
    const result = calculateUserScore(123, ['login', 'purchase'], 1.5);
    expect(result.score).toBe(30); // 2 * 10 * 1.5 = 30 (floored)
  });
});

// ✅ Mocking external dependencies
interface ApiClient {
  getUser(id: number): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<boolean>;
}

// Service that depends on external API
class UserService {
  constructor(private apiClient: ApiClient) {}

  async getUserScore(userId: number): Promise<number | null> {
    try {
      const user = await this.apiClient.getUser(userId);
      if (!user) return null;
      
      // Business logic here
      return user.loginCount * 10;
    } catch (error) {
      console.error('Failed to get user score:', error);
      return null;
    }
  }
}

// ✅ Test with mocked dependencies
describe('UserService', () => {
  let userService: UserService;
  let mockApiClient: jest.Mocked<ApiClient>;

  beforeEach(() => {
    mockApiClient = {
      getUser: jest.fn(),
      updateUser: jest.fn(),
    };
    userService = new UserService(mockApiClient);
  });

  it('should return user score when user exists', async () => {
    const mockUser: User = {
      id: 123,
      name: 'Alice',
      email: 'alice@test.com',
      loginCount: 5,
      createdAt: new Date()
    };

    mockApiClient.getUser.mockResolvedValue(mockUser);

    const score = await userService.getUserScore(123);
    
    expect(score).toBe(50); // 5 logins * 10
    expect(mockApiClient.getUser).toHaveBeenCalledWith(123);
  });

  it('should return null when user not found', async () => {
    mockApiClient.getUser.mockResolvedValue(null);

    const score = await userService.getUserScore(999);
    
    expect(score).toBeNull();
  });

  it('should handle API errors gracefully', async () => {
    mockApiClient.getUser.mockRejectedValue(new Error('API Error'));

    const score = await userService.getUserScore(123);
    
    expect(score).toBeNull();
  });
});

// 💡 TESTING BEST PRACTICES:
// - Test edge cases (empty, null, boundary values)
// - Test error conditions and exceptions
// - Use mocks for external dependencies
// - Test both success and failure paths
// - Keep tests focused and isolated`,
        },
        {
          title: "Debugging & Error Handling",
          description:
            "Advanced debugging techniques • Type-safe error handling • Logging strategies • Development tools",
          language: "typescript",
          code: `// ✅ Comprehensive error handling with types
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

class ValidationError extends AppError {
  constructor(message: string, field: string, value: unknown) {
    super(message, 'VALIDATION_ERROR', 400, { field, value });
    this.name = 'ValidationError';
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string | number) {
    super(\`\${resource} not found\`, 'NOT_FOUND', 404, { resource, id });
    this.name = 'NotFoundError';
  }
}

// ✅ Type-safe error handling utility
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function safeAsync<T>(
  operation: () => Promise<T>
): Promise<Result<T, AppError>> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error };
    }
    
    // Convert unknown errors to AppError
    const appError = new AppError(
      error instanceof Error ? error.message : 'Unknown error',
      'UNKNOWN_ERROR',
      500,
      { originalError: error }
    );
    
    return { success: false, error: appError };
  }
}

// ✅ Comprehensive logging system
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogContext {
  userId?: number;
  requestId?: string;
  operation?: string;
  [key: string]: unknown;
}

class Logger {
  constructor(
    private level: LogLevel = LogLevel.INFO,
    private context: LogContext = {}
  ) {}

  private log(level: LogLevel, message: string, data?: unknown): void {
    if (level < this.level) return;

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: LogLevel[level],
      message,
      context: this.context,
      ...(data && { data }),
    };

    console.log(JSON.stringify(logEntry));
  }

  debug(message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: Error | unknown): void {
    const errorData = error instanceof Error 
      ? { message: error.message, stack: error.stack }
      : error;
    
    this.log(LogLevel.ERROR, message, errorData);
  }

  withContext(context: LogContext): Logger {
    return new Logger(this.level, { ...this.context, ...context });
  }
}

// ✅ Debug decorators for development
function debugMethod(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const logger = new Logger(LogLevel.DEBUG);
    
    logger.debug(\`Calling \${target.constructor.name}.\${propertyName}\`, {
      arguments: args,
    });

    try {
      const result = method.apply(this, args);
      
      if (result instanceof Promise) {
        return result
          .then((res) => {
            logger.debug(\`\${target.constructor.name}.\${propertyName} resolved\`, res);
            return res;
          })
          .catch((err) => {
            logger.error(\`\${target.constructor.name}.\${propertyName} rejected\`, err);
            throw err;
          });
      }
      
      logger.debug(\`\${target.constructor.name}.\${propertyName} returned\`, result);
      return result;
    } catch (error) {
      logger.error(\`\${target.constructor.name}.\${propertyName} threw error\`, error);
      throw error;
    }
  };
}

// Usage example
class UserRepository {
  @debugMethod
  async findById(id: number): Promise<User | null> {
    // Implementation
    if (id <= 0) {
      throw new ValidationError('Invalid user ID', 'id', id);
    }
    
    // Simulate API call
    return { id, name: 'Alice', email: 'alice@test.com', createdAt: new Date() };
  }
}

// ✅ Performance monitoring
function measurePerformance<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: any[]) => {
    const start = performance.now();
    const result = fn(...args);
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const end = performance.now();
        console.log(\`⏱️ \${name} took \${end - start}ms\`);
      });
    }
    
    const end = performance.now();
    console.log(\`⏱️ \${name} took \${end - start}ms\`);
    return result;
  }) as T;
}

// 💡 DEBUGGING STRATEGIES:
// - Use typed errors for better error handling
// - Implement comprehensive logging with context
// - Use decorators for method tracing in development
// - Monitor performance of critical operations
// - Include relevant context in all log messages`,
        },
      ],
    },
  ],
};
