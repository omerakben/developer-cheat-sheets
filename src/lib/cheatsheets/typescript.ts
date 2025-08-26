import { CheatSheet } from "@/types/cheatsheet";

export const typescriptCheatSheet: CheatSheet = {
  title: "TypeScript Cheat Sheet",
  description:
    "Strategic TypeScript guide for mid-level developers • Type safety first • Performance patterns • Production best practices",
  sections: [
    {
      id: "essentials-security",
      title: "TypeScript Essentials & Security",
      description:
        "Type safety first approach • Runtime validation • Input sanitization • Secure coding patterns",
      examples: [
        {
          title: "Type Safety & Runtime Validation",
          description:
            "Strong typing for maintainability • Runtime validation prevents errors • Essential for production • Prevents injection attacks",
          language: "typescript",
          code: `// ✅ Strong typing with validation - ALWAYS use in production
interface User {
  readonly id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
}

// ✅ Type guards for runtime validation
function isValidUser(obj: unknown): obj is User {
  return typeof obj === "object" && 
         obj !== null &&
         typeof (obj as User).id === "number" &&
         typeof (obj as User).name === "string" &&
         typeof (obj as User).email === "string" &&
         ["admin", "user", "guest"].includes((obj as User).role);
}

// 🔒 SECURITY: Always validate external data
function processUserData(userData: unknown): User | null {
  if (!isValidUser(userData)) {
    console.error("Invalid user data received");
    return null;
  }
  
  // Additional validation
  if (!userData.email.includes("@") || userData.email.length < 5) {
    console.error("Invalid email format");
    return null;
  }
  
  return userData;
}

// ✅ Branded types for additional safety
type UserId = number & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };

function createUserId(id: number): UserId | null {
  return id > 0 ? id as UserId : null;
}

function createEmail(email: string): Email | null {
  return email.includes("@") && email.length >= 5 ? email as Email : null;
}

// 💡 WHEN TO USE: Type guards are essential for API data, user input, and any external sources
// 💡 WHY: Prevents runtime errors and security vulnerabilities
// 💡 COMMON MISTAKE: Trusting external data without validation`,
        },
        {
          title: "Input Sanitization & Secure String Handling",
          description:
            "Sanitize all user input • Prevent XSS attacks • Use template literals safely • Validate and escape content",
          language: "typescript",
          code: `// 🔒 SECURITY: Input sanitization functions
function sanitizeHtmlInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

function sanitizeUsername(username: string): string | null {
  // Only allow alphanumeric and underscore
  const cleaned = username.trim().toLowerCase();
  const isValid = /^[a-zA-Z0-9_]{3,20}$/.test(cleaned);
  return isValid ? cleaned : null;
}

// ✅ Safe string operations with validation
class SafeString {
  private constructor(private readonly value: string) {}
  
  static create(input: string): SafeString | null {
    if (typeof input !== "string" || input.length === 0) {
      return null;
    }
    return new SafeString(sanitizeHtmlInput(input));
  }
  
  toString(): string {
    return this.value;
  }
  
  concat(other: SafeString): SafeString {
    return new SafeString(this.value + other.value);
  }
}

// ✅ Template literal type safety
type AllowedDomains = "example.com" | "test.com" | "myapp.com";
type EmailAddress<T extends AllowedDomains> = \`\${string}@\${T}\`;

function sendEmail<T extends AllowedDomains>(
  to: EmailAddress<T>, 
  subject: string, 
  body: string
): boolean {
  // Email sending logic with domain validation
  const [, domain] = to.split("@");
  const allowedDomains: AllowedDomains[] = ["example.com", "test.com", "myapp.com"];
  
  if (!allowedDomains.includes(domain as AllowedDomains)) {
    console.error(\`Unauthorized domain: \${domain}\`);
    return false;
  }
  
  // Safe to send email
  console.log(\`Sending email to \${to}\`);
  return true;
}

// 🔒 Path traversal prevention
function validateFilePath(userPath: string): string | null {
  // Prevent directory traversal
  if (userPath.includes("..") || userPath.includes("~") || userPath.startsWith("/")) {
    console.warn(\`Potential path traversal attempt: \${userPath}\`);
    return null;
  }
  
  // Only allow alphanumeric, dash, underscore, and dot
  const sanitized = userPath.replace(/[^a-zA-Z0-9._-]/g, "");
  return sanitized.length > 0 ? sanitized : null;
}

// 💡 SECURITY BEST PRACTICES:
// - Always sanitize user input before processing
// - Use branded types for sensitive data
// - Validate domains and paths to prevent attacks
// - Never trust external data without validation`,
        },
        {
          title: "Numbers & Type-Safe Math Operations",
          description:
            "Handle numbers safely • Prevent overflow/underflow • Use appropriate numeric types • Validate arithmetic operations",
          language: "typescript",
          code: `// ⚡ Type-safe numeric operations
type SafeInteger = number & { readonly __brand: "SafeInteger" };
type PositiveNumber = number & { readonly __brand: "PositiveNumber" };
type Percentage = number & { readonly __brand: "Percentage" };

function createSafeInteger(value: number): SafeInteger | null {
  if (!Number.isInteger(value) || !Number.isSafeInteger(value)) {
    return null;
  }
  return value as SafeInteger;
}

function createPositiveNumber(value: number): PositiveNumber | null {
  if (typeof value !== "number" || value <= 0 || !Number.isFinite(value)) {
    return null;
  }
  return value as PositiveNumber;
}

function createPercentage(value: number): Percentage | null {
  if (typeof value !== "number" || value < 0 || value > 100) {
    return null;
  }
  return value as Percentage;
}

// ✅ Safe arithmetic operations
class SafeMath {
  static divide(a: number, b: number): number | null {
    if (b === 0 || !Number.isFinite(a) || !Number.isFinite(b)) {
      return null;
    }
    const result = a / b;
    return Number.isFinite(result) ? result : null;
  }
  
  static add(a: number, b: number): number | null {
    const result = a + b;
    if (!Number.isFinite(result)) {
      console.error("Addition resulted in non-finite number");
      return null;
    }
    return result;
  }
  
  static multiply(a: number, b: number): number | null {
    const result = a * b;
    if (!Number.isFinite(result)) {
      console.error("Multiplication resulted in non-finite number");
      return null;
    }
    return result;
  }
}

// 🔒 Financial calculations with precision
class Money {
  private readonly cents: SafeInteger;
  
  constructor(dollars: number) {
    const cents = Math.round(dollars * 100);
    const safeCents = createSafeInteger(cents);
    if (!safeCents) {
      throw new Error(\`Invalid monetary amount: \${dollars}\`);
    }
    this.cents = safeCents;
  }
  
  add(other: Money): Money {
    const newCents = createSafeInteger(this.cents + other.cents);
    if (!newCents) {
      throw new Error("Monetary addition overflow");
    }
    return new Money(newCents / 100);
  }
  
  multiply(factor: PositiveNumber): Money {
    const result = SafeMath.multiply(this.cents, factor);
    if (!result) {
      throw new Error("Monetary multiplication error");
    }
    return new Money(result / 100);
  }
  
  toDollars(): number {
    return this.cents / 100;
  }
}

// ✅ Range validation
function validateRange(value: number, min: number, max: number): boolean {
  return typeof value === "number" && 
         Number.isFinite(value) && 
         value >= min && 
         value <= max;
}

// 💡 WHEN TO USE:
// - Branded types: Financial calculations, IDs, measurements
// - SafeMath: Any user-input arithmetic operations
// - Range validation: Age, scores, percentages, quantities`,
        },
      ],
    },
    {
      id: "data-structures-performance",
      title: "Data Structures & Performance",
      description:
        "Choose optimal structures • Understand performance implications • Memory-efficient patterns • Type-safe collections",
      examples: [
        {
          title: "Arrays vs Sets vs Maps - Performance Guide",
          description:
            "Arrays: ordered access needed • Sets: fast membership testing • Maps: key-value performance • Choose based on use case",
          language: "typescript",
          code: `// ⚡ PERFORMANCE: Choose the right data structure

// ✅ Arrays: Use for ordered data and frequent access by index
const users: readonly User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin", createdAt: new Date() },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user", createdAt: new Date() }
];

// O(1) access by index
const firstUser = users[0];

// ✅ Sets: Use for membership testing and unique values
const validRoles = new Set<User["role"]>(["admin", "user", "guest"]);

function isValidRole(role: string): role is User["role"] {
  return validRoles.has(role as User["role"]); // O(1) lookup vs O(n) for arrays
}

// ✅ Maps: Use for key-value associations with object keys
const userCache = new Map<number, User>();

function getUserById(id: number): User | null {
  return userCache.get(id) || null; // O(1) lookup
}

function cacheUser(user: User): void {
  userCache.set(user.id, user); // O(1) insertion
}

// ⚡ MEMORY: ReadonlyArray for immutable collections
type ImmutableUsers = readonly User[];

function processUsers(users: ImmutableUsers): ImmutableUsers {
  // Functional approach - creates new array, doesn't mutate
  return users.filter(user => user.role !== "guest")
              .sort((a, b) => a.name.localeCompare(b.name));
}

// ✅ Typed collections with constraints
class TypedSet<T> {
  private readonly items = new Set<T>();
  
  constructor(
    private readonly validator: (item: T) => boolean,
    private readonly maxSize: number = 1000
  ) {}
  
  add(item: T): boolean {
    if (!this.validator(item)) {
      console.warn("Invalid item rejected");
      return false;
    }
    
    if (this.items.size >= this.maxSize) {
      console.warn("Set size limit reached");
      return false;
    }
    
    this.items.add(item);
    return true;
  }
  
  has(item: T): boolean {
    return this.items.has(item);
  }
  
  size(): number {
    return this.items.size;
  }
  
  toArray(): T[] {
    return Array.from(this.items);
  }
}

// Usage with validation
const emailSet = new TypedSet<string>(
  (email) => email.includes("@") && email.length >= 5,
  100
);

// 💡 PERFORMANCE COMPARISON:
// Array.includes(): O(n) - linear search
// Set.has(): O(1) - hash lookup  
// Map.get(): O(1) - hash lookup
// Object property access: O(1) - but limited to string keys

// 💡 WHEN TO USE:
// - Array: Need indexing, ordered data, frequent iteration
// - Set: Membership testing, removing duplicates, unique collections
// - Map: Key-value pairs with non-string keys, frequent lookups
// - WeakMap/WeakSet: When you need garbage collection of keys`,
        },
        {
          title: "Type-Safe Object Manipulation",
          description:
            "Safe property access • Prevent runtime errors • Use proper typing • Handle optional properties",
          language: "typescript",
          code: `// 🔒 Safe object operations with type guards
interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
}

function isSuccessResponse<T>(response: ApiResponse): response is ApiResponse<T> & { data: T } {
  return response.status >= 200 && response.status < 300 && response.data !== undefined;
}

function isErrorResponse(response: ApiResponse): response is ApiResponse & { error: string } {
  return response.status >= 400 && response.error !== undefined;
}

// ✅ Safe property access with default values
function getProperty<T, K extends keyof T>(obj: T, key: K, defaultValue: T[K]): T[K] {
  const value = obj[key];
  return value !== undefined ? value : defaultValue;
}

// ✅ Safe object updates - immutable approach
function updateUser<K extends keyof User>(
  user: User, 
  updates: Pick<User, K>
): User {
  // Validate updates before applying
  const validatedUpdates: Partial<User> = {};
  
  for (const [key, value] of Object.entries(updates)) {
    if (key === "email" && typeof value === "string") {
      if (value.includes("@")) {
        validatedUpdates.email = value;
      }
    } else if (key === "name" && typeof value === "string") {
      if (value.trim().length > 0) {
        validatedUpdates.name = value.trim();
      }
    } else if (key === "role" && typeof value === "string") {
      if (validRoles.has(value as User["role"])) {
        validatedUpdates.role = value as User["role"];
      }
    }
  }
  
  return { ...user, ...validatedUpdates };
}

// ✅ Type-safe object transformation
function transformObject<T, U>(
  obj: T,
  transformer: (value: T[keyof T], key: keyof T) => U
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = transformer(obj[key], key);
    }
  }
  
  return result;
}

// ✅ Deep readonly types for immutable objects
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? T[P] extends Function 
      ? T[P] 
      : DeepReadonly<T[P]>
    : T[P];
};

// ✅ Safe object merging
function mergeObjects<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  target: T,
  source: U
): T & U {
  // Validate that source doesn't override critical target properties
  const protectedKeys = new Set(["id", "createdAt"]);
  
  for (const key of Object.keys(source)) {
    if (protectedKeys.has(key)) {
      console.warn(\`Attempted to override protected property: \${key}\`);
      delete (source as any)[key];
    }
  }
  
  return { ...target, ...source };
}

// 🔒 SECURITY: Prevent prototype pollution
function safeAssign<T extends Record<string, unknown>>(
  target: T,
  source: Record<string, unknown>
): T {
  const result = { ...target };
  
  for (const [key, value] of Object.entries(source)) {
    // Skip dangerous keys
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      console.warn(\`Dangerous key ignored: \${key}\`);
      continue;
    }
    
    (result as any)[key] = value;
  }
  
  return result;
}

// 💡 BEST PRACTICES:
// - Always validate object properties from external sources
// - Use readonly types for immutable data structures
// - Prefer immutable updates over mutations
// - Protect against prototype pollution attacks`,
        },
      ],
    },
    {
      id: "control-flow-patterns",
      title: "Control Flow & Type Safety",
      description:
        "Strategic type narrowing • Type guards • Error handling patterns • Async/await best practices",
      examples: [
        {
          title: "Type Guards & Defensive Programming",
          description:
            "Validate at boundaries • Use discriminated unions • Early returns • Clear error paths",
          language: "typescript",
          code: `// ✅ Strategic type guards - validate at system boundaries
type APIResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code: number };

function isSuccessResponse<T>(response: APIResponse<T>): response is { success: true; data: T } {
  return response.success === true;
}

function isErrorResponse<T>(response: APIResponse<T>): response is { success: false; error: string; code: number } {
  return response.success === false;
}

// ✅ Process API responses safely
async function fetchUserSafely(id: number): Promise<User | null> {
  // Guard clause - validate input early
  if (!Number.isInteger(id) || id <= 0) {
    console.error(\`Invalid user ID: \${id}\`);
    return null;
  }

  try {
    const response: APIResponse<User> = await fetch(\`/api/users/\${id}\`).then(r => r.json());
    
    // Type narrowing with discriminated unions
    if (isSuccessResponse(response)) {
      // TypeScript knows response.data is User
      if (!isValidUser(response.data)) {
        console.error("Invalid user data from API");
        return null;
      }
      return response.data;
    }
    
    if (isErrorResponse(response)) {
      // TypeScript knows response.error and response.code exist
      console.error(\`API Error \${response.code}: \${response.error}\`);
      return null;
    }
    
    console.error("Unexpected API response format");
    return null;
    
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
}

// ✅ Exhaustive type checking with never
type Theme = "light" | "dark" | "auto";

function applyTheme(theme: Theme): void {
  switch (theme) {
    case "light":
      document.body.className = "light-theme";
      break;
    case "dark":
      document.body.className = "dark-theme";
      break;
    case "auto":
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.body.className = prefersDark ? "dark-theme" : "light-theme";
      break;
    default:
      // This ensures all cases are handled
      const exhaustive: never = theme;
      throw new Error(\`Unhandled theme: \${exhaustive}\`);
  }
}

// ✅ Optional chaining and nullish coalescing for safety
interface NestedData {
  user?: {
    profile?: {
      settings?: {
        theme: Theme;
        notifications: boolean;
      };
    };
  };
}

function getThemePreference(data: NestedData): Theme {
  // Safe navigation with fallback
  return data.user?.profile?.settings?.theme ?? "auto";
}

function isNotificationsEnabled(data: NestedData): boolean {
  return data.user?.profile?.settings?.notifications ?? true;
}

// 💡 DEFENSIVE PROGRAMMING:
// - Validate inputs at function boundaries
// - Use discriminated unions for complex state
// - Handle all possible cases with never type
// - Use optional chaining for nested properties
// - Always provide sensible defaults`,
        },
        {
          title: "Async Patterns & Error Handling",
          description:
            "Type-safe promises • Handle rejections properly • Async iterators • Cancellation patterns",
          language: "typescript",
          code: `// ✅ Type-safe async operations with proper error handling
type AsyncResult<T, E = Error> = Promise<
  | { success: true; data: T }
  | { success: false; error: E }
>;

async function safeAsyncOperation<T>(
  operation: () => Promise<T>
): AsyncResult<T> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    return { success: false, error: errorObj };
  }
}

// ✅ Async operation with timeout
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(\`Operation timed out after \${timeoutMs}ms\`)), timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

// ✅ Parallel operations with error aggregation
async function fetchMultipleUsers(ids: number[]): Promise<{
  users: User[];
  errors: Array<{ id: number; error: string }>;
}> {
  const results = await Promise.allSettled(
    ids.map(async (id) => {
      const result = await safeAsyncOperation(() => fetchUserSafely(id));
      return { id, result };
    })
  );
  
  const users: User[] = [];
  const errors: Array<{ id: number; error: string }> = [];
  
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      const { id, result: userResult } = result.value;
      if (userResult && userResult.success) {
        users.push(userResult.data);
      } else if (userResult && !userResult.success) {
        errors.push({ id, error: userResult.error.message });
      }
    } else {
      errors.push({ id: -1, error: result.reason });
    }
  });
  
  return { users, errors };
}

// ✅ Async iterators for streaming data
async function* fetchUsersStream(): AsyncIterableIterator<User> {
  let page = 1;
  const pageSize = 10;
  
  while (true) {
    const result = await safeAsyncOperation(() => 
      fetch(\`/api/users?page=\${page}&size=\${pageSize}\`).then(r => r.json())
    );
    
    if (!result.success) {
      console.error("Failed to fetch users:", result.error);
      break;
    }
    
    const users = result.data;
    if (users.length === 0) break;
    
    for (const user of users) {
      if (isValidUser(user)) {
        yield user;
      }
    }
    
    page++;
  }
}

// ✅ Cancellable async operations
class CancellableOperation<T> {
  private controller = new AbortController();
  private promise: Promise<T>;
  
  constructor(
    operation: (signal: AbortSignal) => Promise<T>
  ) {
    this.promise = operation(this.controller.signal);
  }
  
  cancel(): void {
    this.controller.abort();
  }
  
  async execute(): Promise<T> {
    try {
      return await this.promise;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Operation was cancelled");
      }
      throw error;
    }
  }
}

// Usage
const operation = new CancellableOperation(async (signal) => {
  const response = await fetch("/api/data", { signal });
  return response.json();
});

// Cancel if needed
setTimeout(() => operation.cancel(), 5000);

// 💡 ASYNC BEST PRACTICES:
// - Always handle both success and error cases
// - Use timeouts for external operations
// - Aggregate errors in parallel operations
// - Use async iterators for streaming data
// - Implement cancellation for long-running operations`,
        },
      ],
    },
    {
      id: "functions-patterns",
      title: "Function Design & Error Handling",
      description:
        "Pure functions • Proper error handling • Input validation • Functional programming patterns",
      examples: [
        {
          title: "Strategic Function Design",
          description:
            "Pure functions preferred • Avoid side effects • Single responsibility • Clear error handling",
          language: "typescript",
          code: `// ✅ Pure function - predictable, testable, no side effects
function calculateTax(amount: number, rate: number): number | null {
  // Input validation
  if (typeof amount !== "number" || typeof rate !== "number") {
    return null;
  }
  
  if (amount < 0 || rate < 0 || rate > 1) {
    return null;
  }
  
  if (!Number.isFinite(amount) || !Number.isFinite(rate)) {
    return null;
  }
  
  return Math.round(amount * rate * 100) / 100; // Round to 2 decimal places
}

// ✅ Function composition for complex operations
type Validator<T> = (value: T) => boolean;
type Transformer<T, U> = (value: T) => U;

function compose<T, U, V>(
  validator: Validator<T>,
  transformer: Transformer<T, U>,
  finalValidator: Validator<U>
) {
  return function(input: T): U | null {
    if (!validator(input)) {
      return null;
    }
    
    const transformed = transformer(input);
    
    if (!finalValidator(transformed)) {
      return null;
    }
    
    return transformed;
  };
}

// ✅ Higher-order function for retry logic
function withRetry<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  maxRetries: number = 3,
  delayMs: number = 1000
) {
  return async function(...args: T): Promise<R> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
      }
    }
    
    throw lastError;
  };
}

// ✅ Function overloading for flexible APIs
function processData(input: string): string;
function processData(input: number): number;
function processData(input: User): User;
function processData(input: string | number | User): string | number | User {
  if (typeof input === "string") {
    return input.trim().toLowerCase();
  }
  
  if (typeof input === "number") {
    return Math.max(0, input);
  }
  
  // User object - return validated copy
  if (isValidUser(input)) {
    return { ...input, name: input.name.trim() };
  }
  
  throw new Error("Invalid input type");
}

// ✅ Currying for configuration
function createValidator<T>(
  validationRules: Array<(value: T) => boolean>,
  errorMessages: string[]
) {
  return function(value: T): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    validationRules.forEach((rule, index) => {
      if (!rule(value)) {
        errors.push(errorMessages[index]);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
}

// Usage
const userValidator = createValidator<User>(
  [
    (user) => user.name.length >= 2,
    (user) => user.email.includes("@"),
    (user) => ["admin", "user", "guest"].includes(user.role)
  ],
  [
    "Name must be at least 2 characters",
    "Email must contain @",
    "Role must be valid"
  ]
);

// 💡 WHEN TO USE:
// - Pure functions: Calculations, transformations, business logic
// - Function composition: Complex data processing pipelines
// - Higher-order functions: Cross-cutting concerns like retry, caching
// - Currying: Configuration, specialized validators`,
        },
        {
          title: "Exception Handling & Result Types",
          description:
            "Type-safe error handling • Result types • Never fail silently • Comprehensive logging",
          language: "typescript",
          code: `// ✅ Result type for better error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

function createResult<T>(data: T): Result<T, never> {
  return { success: true, data };
}

function createError<E>(error: E): Result<never, E> {
  return { success: false, error };
}

// ✅ Safe operation wrapper
async function safeOperation<T>(
  operation: () => Promise<T>,
  context?: string
): Promise<Result<T, string>> {
  try {
    const data = await operation();
    return createResult(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const contextMessage = context ? \`\${context}: \${message}\` : message;
    
    console.error("Operation failed:", {
      context,
      error: message,
      timestamp: new Date().toISOString()
    });
    
    return createError(contextMessage);
  }
}

// ✅ Custom error classes for specific domains
class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly value: unknown
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

class NetworkError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly url: string
  ) {
    super(message);
    this.name = "NetworkError";
  }
}

class BusinessError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "BusinessError";
  }
}

// ✅ Error boundary function for async operations
async function withErrorBoundary<T>(
  operation: () => Promise<T>,
  errorHandler: (error: Error) => T | null = () => null
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Validation failed:", {
        field: error.field,
        value: error.value,
        message: error.message
      });
    } else if (error instanceof NetworkError) {
      console.error("Network error:", {
        status: error.status,
        url: error.url,
        message: error.message
      });
    } else if (error instanceof BusinessError) {
      console.error("Business logic error:", {
        code: error.code,
        details: error.details,
        message: error.message
      });
    } else {
      console.error("Unexpected error:", error);
    }
    
    return errorHandler(error instanceof Error ? error : new Error(String(error)));
  }
}

// ✅ Assertion functions for development
function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(\`Assertion failed: \${message}\`);
  }
}

function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") {
    throw new ValidationError(
      \`Expected number, got \${typeof value}\`,
      "value",
      value
    );
  }
}

// ✅ Safe resource management
class ResourceManager<T> {
  constructor(
    private resource: T,
    private cleanup: (resource: T) => void | Promise<void>
  ) {}
  
  async use<R>(operation: (resource: T) => Promise<R>): Promise<Result<R, string>> {
    try {
      const result = await operation(this.resource);
      return createResult(result);
    } catch (error) {
      return createError(error instanceof Error ? error.message : String(error));
    } finally {
      try {
        await this.cleanup(this.resource);
      } catch (cleanupError) {
        console.error("Cleanup failed:", cleanupError);
      }
    }
  }
}

// 💡 ERROR HANDLING STRATEGY:
// - Use Result types for operations that can fail
// - Create domain-specific error classes
// - Never fail silently - always log errors
// - Implement proper cleanup in finally blocks
// - Use assertions for development-time checks`,
        },
      ],
    },
    {
      id: "advanced-patterns",
      title: "Advanced TypeScript Patterns",
      description:
        "Modern TypeScript features • Utility types • Template literals • Performance optimization",
      examples: [
        {
          title: "Advanced Utility Types & Transformations",
          description:
            "Custom utility types • Type transformations • Template literal magic • Conditional types",
          language: "typescript",
          code: `// ✅ Advanced utility types for API design
type StrictOmit<T, K extends keyof T> = Omit<T, K>;
type StrictPick<T, K extends keyof T> = Pick<T, K>;

// ✅ Deep partial for nested objects
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object 
    ? T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[P]>
    : T[P];
};

// ✅ Type-safe path access
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: T[K] extends string
        ? [K]
        : T[K] extends object
        ? [K, ...PathsToStringProps<T[K]>]
        : never;
    }[Extract<keyof T, string>];

type Join<T extends string[], D extends string> = T extends readonly [
  infer F,
  ...infer R
]
  ? F extends string
    ? R extends readonly string[]
      ? R['length'] extends 0
        ? F
        : \`\${F}\${D}\${Join<R, D>}\`
      : never
    : never
  : '';

// Usage for nested property access
type UserPaths = Join<PathsToStringProps<User>, '.'>;
// Result: "name" | "email" | "role"

// ✅ Event system with template literals
type EventMap = {
  'user:created': { user: User };
  'user:updated': { user: User; changes: Partial<User> };
  'user:deleted': { userId: number };
  'system:error': { error: Error; context: string };
};

type EventName = keyof EventMap;
type EventPayload<T extends EventName> = EventMap[T];

class TypedEventEmitter {
  private listeners = new Map<EventName, Function[]>();
  
  on<T extends EventName>(
    event: T,
    listener: (payload: EventPayload<T>) => void
  ): void {
    const existing = this.listeners.get(event) || [];
    this.listeners.set(event, [...existing, listener]);
  }
  
  emit<T extends EventName>(event: T, payload: EventPayload<T>): void {
    const listeners = this.listeners.get(event) || [];
    listeners.forEach(listener => listener(payload));
  }
  
  off<T extends EventName>(
    event: T,
    listener: (payload: EventPayload<T>) => void
  ): void {
    const existing = this.listeners.get(event) || [];
    this.listeners.set(event, existing.filter(l => l !== listener));
  }
}

// ✅ Builder pattern with method chaining
class QueryBuilder<T> {
  private filters: Array<(item: T) => boolean> = [];
  private sortFn?: (a: T, b: T) => number;
  private limitCount?: number;
  
  where(predicate: (item: T) => boolean): this {
    this.filters.push(predicate);
    return this;
  }
  
  sortBy<K extends keyof T>(key: K, direction: 'asc' | 'desc' = 'asc'): this {
    this.sortFn = (a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      const modifier = direction === 'asc' ? 1 : -1;
      
      if (aVal < bVal) return -1 * modifier;
      if (aVal > bVal) return 1 * modifier;
      return 0;
    };
    return this;
  }
  
  limit(count: number): this {
    this.limitCount = count;
    return this;
  }
  
  execute(data: T[]): T[] {
    let result = data.filter(item => 
      this.filters.every(filter => filter(item))
    );
    
    if (this.sortFn) {
      result = result.sort(this.sortFn);
    }
    
    if (this.limitCount) {
      result = result.slice(0, this.limitCount);
    }
    
    return result;
  }
}

// Usage
const userQuery = new QueryBuilder<User>()
  .where(user => user.role === "admin")
  .sortBy("name", "asc")
  .limit(10);

// 💡 ADVANCED PATTERNS:
// - Use conditional types for flexible APIs
// - Template literals for type-safe string operations
// - Builder pattern for complex object construction
// - Event systems with strict payload typing`,
        },
        {
          title: "Performance & Memory Optimization",
          description:
            "Optimize bundle size • Lazy loading • Memory management • Type-only imports",
          language: "typescript",
          code: `// ⚡ Type-only imports for better tree shaking
import type { User } from './types/user';
import type { ApiResponse } from './types/api';

// Only import the actual implementation when needed
const loadUserModule = () => import('./modules/user');

// ✅ Lazy-loaded type-safe modules
interface LazyModule<T> {
  load(): Promise<T>;
  isLoaded(): boolean;
  get(): T | null;
}

class LazyModuleLoader<T> implements LazyModule<T> {
  private module: T | null = null;
  private loading: Promise<T> | null = null;
  
  constructor(private loader: () => Promise<T>) {}
  
  async load(): Promise<T> {
    if (this.module) {
      return this.module;
    }
    
    if (!this.loading) {
      this.loading = this.loader().then(mod => {
        this.module = mod;
        this.loading = null;
        return mod;
      });
    }
    
    return this.loading;
  }
  
  isLoaded(): boolean {
    return this.module !== null;
  }
  
  get(): T | null {
    return this.module;
  }
}

// ✅ Memory-efficient data structures
class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;
  
  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }
  
  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      // Move to end (most recently used)
      const value = this.cache.get(key)!;
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return undefined;
  }
  
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  size(): number {
    return this.cache.size;
  }
}

// ✅ Weak references for memory management
class WeakCache<T extends object, V> {
  private cache = new WeakMap<T, V>();
  
  get(key: T): V | undefined {
    return this.cache.get(key);
  }
  
  set(key: T, value: V): void {
    this.cache.set(key, value);
  }
  
  has(key: T): boolean {
    return this.cache.has(key);
  }
  
  delete(key: T): boolean {
    return this.cache.delete(key);
  }
}

// ✅ Object pooling for frequent allocations
class ObjectPool<T> {
  private pool: T[] = [];
  private createFn: () => T;
  private resetFn: (obj: T) => void;
  
  constructor(
    createFn: () => T,
    resetFn: (obj: T) => void,
    initialSize: number = 10
  ) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    
    // Pre-populate pool
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(createFn());
    }
  }
  
  acquire(): T {
    const obj = this.pool.pop();
    return obj || this.createFn();
  }
  
  release(obj: T): void {
    this.resetFn(obj);
    this.pool.push(obj);
  }
  
  size(): number {
    return this.pool.size;
  }
}

// ✅ Optimized collection operations
class OptimizedArray<T> {
  private items: T[] = [];
  private indices = new Map<T, number>();
  
  add(item: T): void {
    if (!this.indices.has(item)) {
      const index = this.items.length;
      this.items.push(item);
      this.indices.set(item, index);
    }
  }
  
  remove(item: T): boolean {
    const index = this.indices.get(item);
    if (index === undefined) return false;
    
    // Swap with last element and pop
    const lastItem = this.items[this.items.length - 1];
    this.items[index] = lastItem;
    this.indices.set(lastItem, index);
    
    this.items.pop();
    this.indices.delete(item);
    return true;
  }
  
  has(item: T): boolean {
    return this.indices.has(item);
  }
  
  toArray(): readonly T[] {
    return this.items;
  }
}

// 💡 PERFORMANCE OPTIMIZATION:
// - Use type-only imports to reduce bundle size
// - Implement lazy loading for large modules
// - Use appropriate caching strategies (LRU, Weak)
// - Consider object pooling for frequent allocations
// - Optimize collection operations for your use case`,
        },
      ],
    },
    {
      id: "testing-debugging",
      title: "Testing & Debugging Best Practices", 
      description:
        "Type-safe testing • Mock external dependencies • Debug effectively • Comprehensive coverage",
      examples: [
        {
          title: "Strategic Testing Patterns",
          description:
            "Test type safety • Mock dependencies • Test error conditions • Use proper assertions",
          language: "typescript",
          code: `// ✅ Type-safe test utilities
interface TestUser extends User {
  readonly _testId: unique symbol;
}

function createTestUser(overrides: Partial<User> = {}): TestUser {
  return {
    id: Math.floor(Math.random() * 1000),
    name: "Test User",
    email: "test@example.com",
    role: "user" as const,
    createdAt: new Date(),
    ...overrides,
    _testId: Symbol()
  } as TestUser;
}

// ✅ Type-safe mocking
interface MockApi {
  getUser: jest.MockedFunction<(id: number) => Promise<User>>;
  updateUser: jest.MockedFunction<(id: number, data: Partial<User>) => Promise<User>>;
  deleteUser: jest.MockedFunction<(id: number) => Promise<void>>;
}

function createMockApi(): MockApi {
  return {
    getUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
  };
}

// ✅ Test fixtures with type safety
class TestFixtures {
  static users = {
    admin: (): TestUser => createTestUser({
      role: "admin",
      name: "Admin User",
      email: "admin@example.com"
    }),
    
    regular: (): TestUser => createTestUser({
      role: "user",
      name: "Regular User",
      email: "user@example.com"
    }),
    
    guest: (): TestUser => createTestUser({
      role: "guest",
      name: "Guest User",
      email: "guest@example.com"
    })
  };
  
  static apiResponses = {
    success: <T>(data: T): APIResponse<T> => ({
      success: true,
      data
    }),
    
    error: (message: string, code: number = 500): APIResponse<never> => ({
      success: false,
      error: message,
      code
    })
  };
}

// ✅ Comprehensive test suite
describe("UserService", () => {
  let mockApi: MockApi;
  let userService: UserService;
  
  beforeEach(() => {
    mockApi = createMockApi();
    userService = new UserService(mockApi);
  });
  
  describe("getUser", () => {
    it("should return user for valid ID", async () => {
      // Arrange
      const testUser = TestFixtures.users.regular();
      const response = TestFixtures.apiResponses.success(testUser);
      mockApi.getUser.mockResolvedValue(response.data);
      
      // Act
      const result = await userService.getUser(testUser.id);
      
      // Assert
      expect(result).toEqual(testUser);
      expect(mockApi.getUser).toHaveBeenCalledWith(testUser.id);
      expect(mockApi.getUser).toHaveBeenCalledTimes(1);
    });
    
    it("should handle API errors gracefully", async () => {
      // Arrange
      const errorMessage = "User not found";
      mockApi.getUser.mockRejectedValue(new Error(errorMessage));
      
      // Act & Assert
      await expect(userService.getUser(999)).rejects.toThrow(errorMessage);
      expect(mockApi.getUser).toHaveBeenCalledWith(999);
    });
    
    it("should validate user ID input", async () => {
      // Test edge cases
      await expect(userService.getUser(-1)).rejects.toThrow("Invalid user ID");
      await expect(userService.getUser(0)).rejects.toThrow("Invalid user ID");
      await expect(userService.getUser(NaN)).rejects.toThrow("Invalid user ID");
    });
  });
  
  describe("updateUser", () => {
    it("should update user with valid data", async () => {
      // Arrange
      const originalUser = TestFixtures.users.regular();
      const updates = { name: "Updated Name" };
      const updatedUser = { ...originalUser, ...updates };
      
      mockApi.updateUser.mockResolvedValue(updatedUser);
      
      // Act
      const result = await userService.updateUser(originalUser.id, updates);
      
      // Assert
      expect(result.name).toBe("Updated Name");
      expect(mockApi.updateUser).toHaveBeenCalledWith(originalUser.id, updates);
    });
    
    it("should reject invalid email updates", async () => {
      // Test validation
      const user = TestFixtures.users.regular();
      const invalidUpdate = { email: "invalid-email" };
      
      await expect(
        userService.updateUser(user.id, invalidUpdate)
      ).rejects.toThrow("Invalid email format");
    });
  });
});

// ✅ Property-based testing
import { fc } from 'fast-check';

describe("User validation", () => {
  it("should always validate email format", () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => s.includes("@") && s.length >= 5),
        (email) => {
          const user = createTestUser({ email });
          expect(isValidUser(user)).toBe(true);
        }
      )
    );
  });
  
  it("should reject invalid emails", () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => !s.includes("@") || s.length < 5),
        (email) => {
          const user = createTestUser({ email });
          expect(isValidUser(user)).toBe(false);
        }
      )
    );
  });
});

// 💡 TESTING BEST PRACTICES:
// - Create type-safe test utilities and fixtures
// - Mock external dependencies with proper typing
// - Test both success and error conditions
// - Use property-based testing for validation logic
// - Test edge cases and boundary conditions`,
        },
        {
          title: "Debugging & Error Investigation",
          description:
            "Type-safe logging • Debug utilities • Performance profiling • Error tracking",
          language: "typescript",
          code: `// ✅ Type-safe logging system
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
  error?: Error;
}

class TypedLogger {
  private minLevel: LogLevel = LogLevel.INFO;
  
  setLevel(level: LogLevel): void {
    this.minLevel = level;
  }
  
  private log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error): void {
    if (level < this.minLevel) return;
    
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      error
    };
    
    console.log(JSON.stringify(entry, null, 2));
  }
  
  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context);
  }
  
  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context);
  }
  
  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context);
  }
  
  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, context, error);
  }
}

const logger = new TypedLogger();

// ✅ Debug utilities with type information
function debugValue<T>(label: string, value: T): T {
  if (process.env.NODE_ENV === 'development') {
    logger.debug(\`Debug: \${label}\`, {
      type: typeof value,
      value: value,
      constructor: value?.constructor?.name
    });
  }
  return value;
}

function debugFunction<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    logger.debug(\`Calling \${fn.name}\`, { args });
    
    try {
      const result = fn(...args);
      const duration = performance.now() - start;
      
      logger.debug(\`\${fn.name} completed\`, { 
        duration: \`\${duration.toFixed(2)}ms\`,
        result: typeof result === 'object' ? '[Object]' : result
      });
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      logger.error(\`\${fn.name} failed\`, error as Error, {
        duration: \`\${duration.toFixed(2)}ms\`,
        args
      });
      throw error;
    }
  }) as T;
}

// ✅ Performance profiling
class PerformanceProfiler {
  private static marks = new Map<string, number>();
  
  static mark(label: string): void {
    this.marks.set(label, performance.now());
  }
  
  static measure(label: string, startMark: string): number {
    const startTime = this.marks.get(startMark);
    if (!startTime) {
      logger.warn(\`Start mark not found: \${startMark}\`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    logger.info(\`Performance: \${label}\`, { 
      duration: \`\${duration.toFixed(2)}ms\`,
      startMark 
    });
    
    return duration;
  }
  
  static profile<T>(label: string, fn: () => T): T {
    const start = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - start;
      logger.info(\`Profile: \${label}\`, { duration: \`\${duration.toFixed(2)}ms\` });
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      logger.error(\`Profile failed: \${label}\`, error as Error, { 
        duration: \`\${duration.toFixed(2)}ms\` 
      });
      throw error;
    }
  }
}

// ✅ Error boundary with context
class ErrorTracker {
  private static errors: Array<{
    error: Error;
    context: Record<string, unknown>;
    timestamp: Date;
    userAgent?: string;
    url?: string;
  }> = [];
  
  static captureError(
    error: Error, 
    context: Record<string, unknown> = {}
  ): void {
    const errorInfo = {
      error,
      context,
      timestamp: new Date(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined
    };
    
    this.errors.push(errorInfo);
    
    logger.error('Error captured', error, {
      context,
      userAgent: errorInfo.userAgent,
      url: errorInfo.url
    });
    
    // Send to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorInfo);
    }
  }
  
  private static async sendToErrorService(errorInfo: any): Promise<void> {
    try {
      // Implementation for error tracking service
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorInfo)
      });
    } catch (e) {
      logger.warn('Failed to send error to tracking service', { error: e });
    }
  }
  
  static getErrors(): readonly typeof ErrorTracker.errors[number][] {
    return this.errors;
  }
}

// ✅ Type-safe debugging hooks
function useDebugValue<T>(value: T, label: string): T {
  if (process.env.NODE_ENV === 'development') {
    React.useDebugValue(\`\${label}: \${JSON.stringify(value)}\`);
  }
  return value;
}

// Usage examples
const fetchUserWithDebug = debugFunction(fetchUserSafely);
const profiledOperation = () => PerformanceProfiler.profile('userData', () => {
  return processUserData(userData);
});

// 💡 DEBUGGING STRATEGIES:
// - Use structured logging with context
// - Profile performance-critical functions
// - Capture errors with full context information
// - Use type-safe debug utilities in development
// - Monitor and track errors in production`,
        },
      ],
    },
  ],
};
