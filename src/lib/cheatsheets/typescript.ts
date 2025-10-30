import { CheatSheet } from "@/types/cheatsheet";

export const typescriptCheatSheet: CheatSheet = {
  title: "TypeScript Cheat Sheet",
  description:
    "Strategic TypeScript guide for mid-level developers • Security-first approach • Performance patterns • Best practices",
  sections: [
      {
        id: "essentials-security",
        title: "TypeScript Essentials & Security",
        description:
          "Core concepts with security-first approach • Type safety • Runtime validation • Secure coding patterns",
      examples: [
        {
          title: "Type Safety & Runtime Validation",
          description:
            "Strong typing for maintainability • Runtime validation prevents errors • Essential for production • Prevents injection attacks",
          language: "typescript",
          difficulty: "intermediate",
          tags: ["types", "validation", "security", "runtime-checks"],
          code: `// RECOMMENDED: Strong typing with validation - ALWAYS use in production
interface User {
  readonly id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
}

// RECOMMENDED: Type guards for runtime validation
function isValidUser(obj: unknown): obj is User {
  return typeof obj === "object" && 
         obj !== null &&
         typeof (obj as User).id === "number" &&
         typeof (obj as User).name === "string" &&
         typeof (obj as User).email === "string" &&
         ["admin", "user", "guest"].includes((obj as User).role);
}

// SECURITY: SECURITY: Always validate external data
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

// RECOMMENDED: Branded types for additional safety
type UserId = number & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };

function createUserId(id: number): UserId | null {
  return id > 0 ? id as UserId : null;
}

function createEmail(email: string): Email | null {
  return email.includes("@") && email.length >= 5 ? email as Email : null;
}

// TIP: WHEN TO USE: Type guards are essential for API data, user input, and any external sources
// TIP: WHY: Prevents runtime errors and security vulnerabilities
// TIP: COMMON MISTAKE: Trusting external data without validation
// TIP: PRODUCTION TIPS: Always log validation failures for monitoring`,
        },
        {
          title: "Input Sanitization & Secure String Handling",
          description:
            "Sanitize all user input • Prevent XSS attacks • Use template literals safely • Validate and escape content",
          language: "typescript",
          code: `// SECURITY: SECURITY: Input sanitization functions
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

// RECOMMENDED: Safe string operations with validation
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

// RECOMMENDED: Template literal type safety
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

// SECURITY: Path traversal prevention
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

// TIP: SECURITY BEST PRACTICES:
// - Always sanitize user input before processing or storing
// - Use branded types for sensitive data that needs validation
// - Validate domains and file paths to prevent traversal attacks
// - Never trust external data without proper validation
// - Log all security violations for monitoring and incident response`,
        },
        {
          title: "Numbers & Type-Safe Math Operations",
          description:
            "Handle numbers safely • Prevent overflow/underflow • Use appropriate numeric types • Validate arithmetic operations",
          language: "typescript",
          code: `// PERFORMANCE: Type-safe numeric operations
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

// RECOMMENDED: Safe arithmetic operations
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

// SECURITY: Financial calculations with precision
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

// RECOMMENDED: Range validation
function validateRange(value: number, min: number, max: number): boolean {
  return typeof value === "number" && 
         Number.isFinite(value) && 
         value >= min && 
         value <= max;
}

// TIP: WHEN TO USE:
// - Branded types: Financial calculations, IDs, measurements, sensitive data
// - SafeMath: Any user-input arithmetic operations to prevent overflow
// - Range validation: Age, scores, percentages, quantities, user inputs
// - Money class: All financial calculations to prevent precision errors`,
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
          difficulty: "intermediate",
          tags: ["data-structures", "performance", "collections"],
          code: `// PERFORMANCE: PERFORMANCE: Choose the right data structure

// RECOMMENDED: Arrays: Use for ordered data and frequent access by index
const users: readonly User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin", createdAt: new Date() },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user", createdAt: new Date() }
];

// O(1) access by index
const firstUser = users[0];

// RECOMMENDED: Sets: Use for membership testing and unique values
const validRoles = new Set<User["role"]>(["admin", "user", "guest"]);

function isValidRole(role: string): role is User["role"] {
  return validRoles.has(role as User["role"]); // O(1) lookup vs O(n) for arrays
}

// RECOMMENDED: Maps: Use for key-value associations with object keys
const userCache = new Map<number, User>();

function getUserById(id: number): User | null {
  return userCache.get(id) || null; // O(1) lookup
}

function cacheUser(user: User): void {
  userCache.set(user.id, user); // O(1) insertion
}

// PERFORMANCE: MEMORY: ReadonlyArray for immutable collections
type ImmutableUsers = readonly User[];

function processUsers(users: ImmutableUsers): ImmutableUsers {
  // Functional approach - creates new array, doesn't mutate
  return users.filter(user => user.role !== "guest")
              .sort((a, b) => a.name.localeCompare(b.name));
}

// RECOMMENDED: Typed collections with constraints
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

// TIP: PERFORMANCE COMPARISON:
// Array.includes(): O(n) - linear search, slow for large datasets
// Set.has(): O(1) - hash lookup, fast even for large datasets  
// Map.get(): O(1) - hash lookup, efficient key-value operations
// Object property access: O(1) - but limited to string/symbol keys

// TIP: WHEN TO USE:
// - Array: Need indexing, ordered data, frequent iteration, small datasets
// - Set: Membership testing, removing duplicates, unique collections, fast lookups
// - Map: Key-value pairs with non-string keys, frequent lookups, complex keys
// - WeakMap/WeakSet: When you need garbage collection of keys for memory management`,
        },
        {
          title: "Type-Safe Object Manipulation",
          description:
            "Safe property access • Prevent runtime errors • Use proper typing • Handle optional properties",
          language: "typescript",
          code: `// SECURITY: Safe object operations with type guards
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

// RECOMMENDED: Safe property access with default values
function getProperty<T, K extends keyof T>(obj: T, key: K, defaultValue: T[K]): T[K] {
  const value = obj[key];
  return value !== undefined ? value : defaultValue;
}

// RECOMMENDED: Safe object updates - immutable approach
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

// RECOMMENDED: Type-safe object transformation
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

// RECOMMENDED: Deep readonly types for immutable objects
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? T[P] extends Function 
      ? T[P] 
      : DeepReadonly<T[P]>
    : T[P];
};

// RECOMMENDED: Safe object merging
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

// SECURITY: SECURITY: Prevent prototype pollution
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

// TIP: BEST PRACTICES:
// - Always validate object properties from external sources
// - Use readonly types for immutable data structures and shared state
// - Prefer immutable updates over mutations for predictable state changes
// - Protect against prototype pollution attacks in user-facing applications
// - Use type guards for runtime safety when dealing with unknown objects`,
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
          code: `// RECOMMENDED: Strategic type guards - validate at system boundaries
type APIResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code: number };

function isSuccessResponse<T>(response: APIResponse<T>): response is { success: true; data: T } {
  return response.success === true;
}

function isErrorResponse<T>(response: APIResponse<T>): response is { success: false; error: string; code: number } {
  return response.success === false;
}

// RECOMMENDED: Process API responses safely
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

// RECOMMENDED: Exhaustive type checking with never
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

// RECOMMENDED: Optional chaining and nullish coalescing for safety
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

// TIP: DEFENSIVE PROGRAMMING:
// - Validate inputs at function boundaries to catch errors early
// - Use discriminated unions for complex state management
// - Handle all possible cases with never type for exhaustive checking
// - Use optional chaining for nested properties to prevent runtime errors
// - Always provide sensible defaults to ensure graceful degradation`,
        },
        {
          title: "Async Patterns & Error Handling",
          description:
            "Type-safe promises • Handle rejections properly • Async iterators • Cancellation patterns",
          language: "typescript",
          code: `// RECOMMENDED: Type-safe async operations with proper error handling
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

// RECOMMENDED: Async operation with timeout
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(\`Operation timed out after \${timeoutMs}ms\`)), timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

// RECOMMENDED: Parallel operations with error aggregation
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

// RECOMMENDED: Async iterators for streaming data
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

// RECOMMENDED: Cancellable async operations
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

// TIP: ASYNC BEST PRACTICES:
// - Always handle both success and error cases explicitly
// - Use timeouts for external operations to prevent hanging
// - Aggregate errors in parallel operations for better debugging
// - Use async iterators for streaming data to manage memory efficiently
// - Implement cancellation for long-running operations to improve UX`,
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
          code: `// RECOMMENDED: Pure function - predictable, testable, no side effects
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

// RECOMMENDED: Function composition for complex operations
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

// RECOMMENDED: Higher-order function for retry logic
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

// RECOMMENDED: Function overloading for flexible APIs
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

// RECOMMENDED: Currying for configuration
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

// TIP: WHEN TO USE:
// - Pure functions: Calculations, transformations, business logic that doesn't depend on external state
// - Function composition: Complex data processing pipelines that need to be maintainable
// - Higher-order functions: Cross-cutting concerns like retry, caching, logging, validation
// - Currying: Configuration, specialized validators, and creating reusable function factories`,
        },
        {
          title: "Exception Handling & Result Types",
          description:
            "Type-safe error handling • Result types • Never fail silently • Comprehensive logging",
          language: "typescript",
          code: `// RECOMMENDED: Result type for better error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

function createResult<T>(data: T): Result<T, never> {
  return { success: true, data };
}

function createError<E>(error: E): Result<never, E> {
  return { success: false, error };
}

// RECOMMENDED: Safe operation wrapper
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

// RECOMMENDED: Custom error classes for specific domains
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

// RECOMMENDED: Error boundary function for async operations
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

// RECOMMENDED: Assertion functions for development
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

// RECOMMENDED: Safe resource management
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

// TIP: ERROR HANDLING STRATEGY:
// - Use Result types for operations that can fail gracefully
// - Create domain-specific error classes for better debugging and handling
// - Never fail silently - always log errors with context for monitoring
// - Implement proper cleanup in finally blocks to prevent resource leaks
// - Use assertions for development-time checks to catch bugs early`,
        },
      ],
    },
    {
      id: "file-io-security",
      title: "File I/O & Data Security",
      description:
        "Safe file operations • Browser APIs • Local storage security • Network security • Data validation",
      examples: [
        {
          title: "Secure File Operations & Browser APIs",
          description:
            "Safe file reading • Validate file types • Size limits • Handle encoding • Prevent malicious uploads",
          language: "typescript",
          code: `// RECOMMENDED: Safe file reading with comprehensive validation
interface FileValidationConfig {
  maxSizeBytes: number;
  allowedTypes: string[];
  allowedExtensions: string[];
  scanForMalware?: boolean;
}

class SecureFileHandler {
  private static readonly DEFAULT_CONFIG: FileValidationConfig = {
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'text/plain', 'application/pdf'],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.txt', '.pdf'],
    scanForMalware: true
  };

  static async validateAndReadFile(
    file: File,
    config: Partial<FileValidationConfig> = {}
  ): Promise<{ success: true; data: string | ArrayBuffer } | { success: false; error: string }> {
    const fullConfig = { ...this.DEFAULT_CONFIG, ...config };

    // SECURITY: SECURITY: Validate file size to prevent DoS
    if (file.size > fullConfig.maxSizeBytes) {
      return {
        success: false,
        error: \`File too large: \${file.size} bytes (max: \${fullConfig.maxSizeBytes})\`
      };
    }

    // SECURITY: SECURITY: Validate file type
    if (!fullConfig.allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: \`Invalid file type: \${file.type}\`
      };
    }

    // SECURITY: SECURITY: Validate file extension
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!fullConfig.allowedExtensions.includes(extension)) {
      return {
        success: false,
        error: \`Invalid file extension: \${extension}\`
      };
    }

    // SECURITY: SECURITY: Check for suspicious file names
    if (this.hasSuspiciousName(file.name)) {
      return {
        success: false,
        error: "Suspicious file name detected"
      };
    }

    try {
      const data = await this.readFileContent(file);
      
      // Additional content validation for text files
      if (file.type.startsWith('text/') && typeof data === 'string') {
        if (this.hasUnsafeContent(data)) {
          return {
            success: false,
            error: "File contains unsafe content"
          };
        }
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to read file"
      };
    }
  }

  private static hasSuspiciousName(filename: string): boolean {
    const suspiciousPatterns = [
      /\\.exe$/i, /\\.bat$/i, /\\.cmd$/i, /\\.scr$/i,
      /\\.vbs$/i, /\\.js$/i, /\\.jar$/i, /\\.php$/i,
      /\\.\\./, // Double dots
      /<script/i, // Script tags in filename
    ];
    return suspiciousPatterns.some(pattern => pattern.test(filename));
  }

  private static hasUnsafeContent(content: string): boolean {
    const unsafePatterns = [
      /<script[^>]*>/i,
      /javascript:/i,
      /data:text\\/html/i,
      /vbscript:/i,
      /on\\w+\\s*=/i, // Event handlers
    ];
    return unsafePatterns.some(pattern => pattern.test(content));
  }

  private static async readFileContent(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      
      reader.onerror = () => reject(new Error("File reading error"));
      
      // Read as text for text files, as array buffer for binary
      if (file.type.startsWith('text/')) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  }
}

// RECOMMENDED: Usage example
async function handleFileUpload(fileInput: HTMLInputElement): Promise<void> {
  const files = fileInput.files;
  if (!files || files.length === 0) return;

  for (const file of Array.from(files)) {
    const result = await SecureFileHandler.validateAndReadFile(file, {
      maxSizeBytes: 5 * 1024 * 1024, // 5MB limit
      allowedTypes: ['image/jpeg', 'image/png']
    });

    if (result.success) {
      console.log("File processed successfully:", file.name);
      // Process the file data safely
    } else {
      console.error("File validation failed:", result.error);
      // Show error to user
    }
  }
}

// TIP: SECURITY BEST PRACTICES:
// - Always validate file size, type, and extension to prevent malicious uploads
// - Scan file content for suspicious patterns before processing
// - Use Content Security Policy headers to prevent XSS through uploaded files
// - Store uploaded files outside web root with randomized names
// - Implement virus scanning for production applications`,
        },
        {
          title: "Secure Local Storage & Session Management",
          description:
            "Safe data persistence • Encrypt sensitive data • Validate stored data • Handle storage quota",
          language: "typescript",
          code: `// SECURITY: Secure storage wrapper with encryption and validation
interface StorageItem<T> {
  data: T;
  timestamp: number;
  expiry?: number;
  encrypted?: boolean;
}

class SecureStorage {
  private static readonly PREFIX = 'app_';
  private static readonly ENCRYPTION_KEY = 'your-secret-key'; // Use proper key management!

  // RECOMMENDED: Store data securely with expiration
  static setItem<T>(
    key: string,
    value: T,
    options: {
      expiryHours?: number;
      encrypt?: boolean;
      validateOnRead?: (data: T) => boolean;
    } = {}
  ): boolean {
    try {
      const item: StorageItem<T> = {
        data: value,
        timestamp: Date.now(),
        encrypted: options.encrypt,
      };

      if (options.expiryHours) {
        item.expiry = Date.now() + (options.expiryHours * 60 * 60 * 1000);
      }

      let serialized = JSON.stringify(item);
      
      // SECURITY: SECURITY: Encrypt sensitive data
      if (options.encrypt) {
        serialized = this.encrypt(serialized);
      }

      const storageKey = this.PREFIX + key;
      localStorage.setItem(storageKey, serialized);
      
      return true;
    } catch (error) {
      console.error('Failed to store item:', error);
      return false;
    }
  }

  // RECOMMENDED: Retrieve data with validation and expiry check
  static getItem<T>(
    key: string,
    validator?: (data: unknown) => data is T
  ): T | null {
    try {
      const storageKey = this.PREFIX + key;
      let stored = localStorage.getItem(storageKey);
      
      if (!stored) return null;

      // Decrypt if needed (detect encryption by trying to parse)
      try {
        JSON.parse(stored);
      } catch {
        // Likely encrypted, try to decrypt
        stored = this.decrypt(stored);
      }

      const item: StorageItem<T> = JSON.parse(stored);

      // Check expiry
      if (item.expiry && Date.now() > item.expiry) {
        this.removeItem(key);
        return null;
      }

      // Validate data if validator provided
      if (validator && !validator(item.data)) {
        console.warn(\`Invalid data found for key: \${key}\`);
        this.removeItem(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.error('Failed to retrieve item:', error);
      return null;
    }
  }

  // RECOMMENDED: Safe removal
  static removeItem(key: string): void {
    const storageKey = this.PREFIX + key;
    localStorage.removeItem(storageKey);
  }

  // RECOMMENDED: Clear all app data
  static clearAll(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  // RECOMMENDED: Check storage quota
  static getStorageInfo(): { used: number; available: number; percentage: number } {
    try {
      const test = 'test';
      const total = 1024 * 1024 * 5; // Approximate 5MB limit
      let used = 0;

      // Calculate used space
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length;
        }
      }

      return {
        used,
        available: total - used,
        percentage: (used / total) * 100
      };
    } catch {
      return { used: 0, available: 0, percentage: 0 };
    }
  }

  // SECURITY: Simple encryption (use crypto-js or Web Crypto API in production)
  private static encrypt(text: string): string {
    // This is a simple XOR cipher for demo - use proper encryption in production!
    return btoa(text.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ this.ENCRYPTION_KEY.charCodeAt(i % this.ENCRYPTION_KEY.length))
    ).join(''));
  }

  private static decrypt(encrypted: string): string {
    const decoded = atob(encrypted);
    return decoded.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ this.ENCRYPTION_KEY.charCodeAt(i % this.ENCRYPTION_KEY.length))
    ).join('');
  }
}

// RECOMMENDED: Type-safe user session management
interface UserSession {
  userId: number;
  username: string;
  role: 'admin' | 'user' | 'guest';
  loginTime: number;
  lastActivity: number;
}

class SessionManager {
  private static readonly SESSION_KEY = 'user_session';
  private static readonly SESSION_TIMEOUT_HOURS = 8;

  static createSession(user: Omit<UserSession, 'loginTime' | 'lastActivity'>): boolean {
    const session: UserSession = {
      ...user,
      loginTime: Date.now(),
      lastActivity: Date.now()
    };

    return SecureStorage.setItem(this.SESSION_KEY, session, {
      expiryHours: this.SESSION_TIMEOUT_HOURS,
      encrypt: true
    });
  }

  static getSession(): UserSession | null {
    return SecureStorage.getItem(this.SESSION_KEY, this.isValidSession);
  }

  static updateActivity(): void {
    const session = this.getSession();
    if (session) {
      session.lastActivity = Date.now();
      SecureStorage.setItem(this.SESSION_KEY, session, {
        expiryHours: this.SESSION_TIMEOUT_HOURS,
        encrypt: true
      });
    }
  }

  static logout(): void {
    SecureStorage.removeItem(this.SESSION_KEY);
    // Clear other sensitive data
    SecureStorage.clearAll();
  }

  private static isValidSession(data: unknown): data is UserSession {
    return typeof data === 'object' && 
           data !== null &&
           typeof (data as UserSession).userId === 'number' &&
           typeof (data as UserSession).username === 'string' &&
           ['admin', 'user', 'guest'].includes((data as UserSession).role);
  }
}

// TIP: STORAGE SECURITY BEST PRACTICES:
// - Never store sensitive data (passwords, tokens) in localStorage without encryption
// - Always validate data when reading from storage to prevent injection attacks
// - Implement expiration for all stored data to limit exposure window
// - Monitor storage quota to prevent denial of service
// - Clear sensitive data on logout and use secure session management`,
        },
        {
          title: "Network Security & API Communication",
          description:
            "Secure HTTP requests • Request validation • Error handling • Rate limiting • CSRF protection",
          language: "typescript",
          code: `// RECOMMENDED: Secure HTTP client with comprehensive protection
interface RequestConfig {
  timeout?: number;
  retries?: number;
  validateResponse?: boolean;
  includeCredentials?: boolean;
  csrfToken?: string;
}

interface ApiError {
  code: string;
  message: string;
  status: number;
  timestamp: Date;
}

class SecureHttpClient {
  private static readonly DEFAULT_TIMEOUT = 10000;
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
  private static readonly REQUEST_COUNTER = new Map<string, number>();

  // RECOMMENDED: Rate limiting per endpoint
  private static checkRateLimit(endpoint: string): boolean {
    const now = Date.now();
    const key = \`\${endpoint}_\${Math.floor(now / 60000)}\`; // Per minute window
    const count = this.REQUEST_COUNTER.get(key) || 0;
    
    if (count >= 100) { // 100 requests per minute limit
      console.warn(\`Rate limit exceeded for endpoint: \${endpoint}\`);
      return false;
    }
    
    this.REQUEST_COUNTER.set(key, count + 1);
    return true;
  }

  // RECOMMENDED: Secure request wrapper
  static async request<T>(
    endpoint: string,
    options: RequestInit & RequestConfig = {}
  ): Promise<Result<T, ApiError>> {
    // SECURITY: SECURITY: Rate limiting
    if (!this.checkRateLimit(endpoint)) {
      return createError({
        code: 'RATE_LIMITED',
        message: 'Too many requests',
        status: 429,
        timestamp: new Date()
      });
    }

    // SECURITY: SECURITY: Validate URL to prevent SSRF
    if (!this.isValidEndpoint(endpoint)) {
      return createError({
        code: 'INVALID_ENDPOINT',
        message: 'Invalid endpoint URL',
        status: 400,
        timestamp: new Date()
      });
    }

    const {
      timeout = this.DEFAULT_TIMEOUT,
      retries = 3,
      validateResponse = true,
      includeCredentials = false,
      csrfToken,
      ...fetchOptions
    } = options;

    // RECOMMENDED: Build secure headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', // CSRF protection
      ...((fetchOptions.headers as Record<string, string>) || {})
    });

    // SECURITY: SECURITY: Add CSRF token
    if (csrfToken) {
      headers.set('X-CSRF-Token', csrfToken);
    }

    // SECURITY: SECURITY: Add security headers
    headers.set('X-Content-Type-Options', 'nosniff');
    
    const requestOptions: RequestInit = {
      ...fetchOptions,
      headers,
      credentials: includeCredentials ? 'include' : 'same-origin',
    };

    // RECOMMENDED: Implement retry logic with exponential backoff
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const response = await fetch(\`\${this.BASE_URL}\${endpoint}\`, {
          ...requestOptions,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // RECOMMENDED: Validate response
        if (!response.ok) {
          const errorData = await this.parseErrorResponse(response);
          return createError(errorData);
        }

        // SECURITY: SECURITY: Validate content type
        const contentType = response.headers.get('content-type');
        if (validateResponse && contentType && !contentType.includes('application/json')) {
          return createError({
            code: 'INVALID_CONTENT_TYPE',
            message: \`Expected JSON, got \${contentType}\`,
            status: response.status,
            timestamp: new Date()
          });
        }

        const data = await response.json();
        
        // RECOMMENDED: Validate response structure
        if (validateResponse && !this.isValidResponse(data)) {
          return createError({
            code: 'INVALID_RESPONSE',
            message: 'Response validation failed',
            status: 422,
            timestamp: new Date()
          });
        }

        return createResult(data);

      } catch (error) {
        if (attempt === retries) {
          return createError({
            code: 'NETWORK_ERROR',
            message: error instanceof Error ? error.message : 'Network request failed',
            status: 0,
            timestamp: new Date()
          });
        }

        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    return createError({
      code: 'MAX_RETRIES_EXCEEDED',
      message: 'Request failed after maximum retries',
      status: 0,
      timestamp: new Date()
    });
  }

  // RECOMMENDED: Type-safe API methods
  static async get<T>(endpoint: string, config?: RequestConfig): Promise<Result<T, ApiError>> {
    return this.request<T>(endpoint, { method: 'GET', ...config });
  }

  static async post<T>(
    endpoint: string, 
    data: unknown, 
    config?: RequestConfig
  ): Promise<Result<T, ApiError>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config
    });
  }

  static async put<T>(
    endpoint: string, 
    data: unknown, 
    config?: RequestConfig
  ): Promise<Result<T, ApiError>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config
    });
  }

  static async delete<T>(endpoint: string, config?: RequestConfig): Promise<Result<T, ApiError>> {
    return this.request<T>(endpoint, { method: 'DELETE', ...config });
  }

  // SECURITY: Validate endpoint to prevent SSRF attacks
  private static isValidEndpoint(endpoint: string): boolean {
    // Only allow relative URLs or whitelisted domains
    if (endpoint.startsWith('/')) return true;
    
    const allowedDomains = [
      'api.yourdomain.com',
      'secure-api.yourdomain.com'
    ];
    
    try {
      const url = new URL(endpoint);
      return allowedDomains.includes(url.hostname);
    } catch {
      return false;
    }
  }

  private static async parseErrorResponse(response: Response): Promise<ApiError> {
    try {
      const errorData = await response.json();
      return {
        code: errorData.code || 'UNKNOWN_ERROR',
        message: errorData.message || response.statusText,
        status: response.status,
        timestamp: new Date()
      };
    } catch {
      return {
        code: 'PARSE_ERROR',
        message: response.statusText || 'Unknown error',
        status: response.status,
        timestamp: new Date()
      };
    }
  }

  private static isValidResponse(data: unknown): boolean {
    // Basic validation - implement according to your API schema
    return typeof data === 'object' && data !== null;
  }
}

// RECOMMENDED: Usage example with proper error handling
async function fetchUserProfile(userId: number): Promise<UserSession | null> {
  const result = await SecureHttpClient.get<UserSession>(\`/api/users/\${userId}\`, {
    timeout: 5000,
    validateResponse: true,
    includeCredentials: true
  });

  if (result.success) {
    return result.data;
  } else {
    console.error('Failed to fetch user profile:', {
      code: result.error.code,
      message: result.error.message,
      status: result.error.status
    });
    return null;
  }
}

// TIP: NETWORK SECURITY BEST PRACTICES:
// - Implement rate limiting to prevent abuse and DoS attacks
// - Validate all endpoints to prevent SSRF (Server-Side Request Forgery)
// - Use CSRF tokens for state-changing operations
// - Set secure headers to prevent common attacks (XSS, clickjacking)
// - Always validate response content and structure before processing
// - Implement proper error handling without exposing sensitive information`,
        },
      ],
    },
    {
      id: "performance-optimization",
      title: "Performance & Memory Optimization",
      description:
        "Optimize bundle size • Lazy loading • Memory management • Efficient algorithms • Type-only imports",
      examples: [
        {
          title: "Bundle Optimization & Code Splitting",
          description:
            "Reduce bundle size • Tree shaking • Dynamic imports • Type-only imports • Lazy loading patterns",
          language: "typescript",
          code: `// PERFORMANCE: Type-only imports for better tree shaking
import type { User, ApiResponse } from './types/user';
import type { ComponentProps } from 'react';

// Only import the actual implementation when needed
const loadUserModule = () => import('./modules/user');
const loadChartComponent = () => import('./components/Chart');

// RECOMMENDED: Lazy-loaded type-safe modules
interface LazyModule<T> {
  load(): Promise<T>;
  isLoaded(): boolean;
  get(): T | null;
}

class LazyModuleLoader<T> implements LazyModule<T> {
  private module: T | null = null;
  private loading: Promise<T> | null = null;
  
  constructor(private loader: () => Promise<{ default: T } | T>) {}
  
  async load(): Promise<T> {
    if (this.module) {
      return this.module;
    }
    
    if (!this.loading) {
      this.loading = this.loader().then(mod => {
        // Handle both default exports and direct exports
        const loadedModule = 'default' in mod ? mod.default : mod;
        this.module = loadedModule;
        this.loading = null;
        return loadedModule;
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

// RECOMMENDED: Smart component lazy loading
interface LazyComponentProps<T> {
  loader: () => Promise<{ default: React.ComponentType<T> }>;
  fallback?: React.ComponentNode;
  props: T;
}

function LazyComponent<T>({ loader, fallback, props }: LazyComponentProps<T>) {
  const [Component, setComponent] = React.useState<React.ComponentType<T> | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loader()
      .then(({ default: LoadedComponent }) => {
        setComponent(() => LoadedComponent);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load component');
      });
  }, [loader]);

  if (error) {
    return <div>Error loading component: {error}</div>;
  }

  if (!Component) {
    return fallback || <div>Loading...</div>;
  }

  return <Component {...props} />;
}

// RECOMMENDED: Bundle analyzer utility
interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  modules: Array<{ name: string; size: number; }>;
  duplicates: string[];
}

class BundleOptimizer {
  // RECOMMENDED: Detect unused exports (for build-time analysis)
  static analyzeImports(sourceCode: string): {
    imports: string[];
    unusedImports: string[];
    typeOnlyImports: string[];
  } {
    const importRegex = /import\\s+(?:{([^}]+)}|([\\w*]+))\\s+from\\s+['"]([^'"]+)['"]/g;
    const typeImportRegex = /import\\s+type\\s+{([^}]+)}\\s+from\\s+['"]([^'"]+)['"]/g;
    
    const imports: string[] = [];
    const typeOnlyImports: string[] = [];
    let match;

    // Find type-only imports
    while ((match = typeImportRegex.exec(sourceCode)) !== null) {
      typeOnlyImports.push(...match[1].split(',').map(s => s.trim()));
    }

    // Find regular imports
    while ((match = importRegex.exec(sourceCode)) !== null) {
      if (match[1]) {
        imports.push(...match[1].split(',').map(s => s.trim()));
      } else if (match[2]) {
        imports.push(match[2]);
      }
    }

    const unusedImports = imports.filter(imp => {
      // Simple check if import name appears elsewhere in code
      const count = sourceCode.split(imp).length - 1;
      return count <= 1; // Only appears once (in import)
    });

    return { imports, unusedImports, typeOnlyImports };
  }

  // RECOMMENDED: Dynamic import with preloading
  static createPreloadableImport<T>(
    loader: () => Promise<T>,
    preloadCondition?: () => boolean
  ) {
    let preloaded: Promise<T> | null = null;

    return {
      preload(): Promise<T> {
        if (!preloaded) {
          preloaded = loader();
        }
        return preloaded;
      },

      load(): Promise<T> {
        if (preloaded) {
          return preloaded;
        }
        return loader();
      },

      autoPreload(): void {
        if (preloadCondition && preloadCondition()) {
          this.preload();
        }
      }
    };
  }
}

// RECOMMENDED: Webpack bundle splitting optimization hints
/* webpack/tsconfig.json configuration:
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "noEmit": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true // Preserves type-only imports
  }
}

// webpack.config.js optimization:
{
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    },
    usedExports: true, // Enable tree shaking
    sideEffects: false, // Mark package as side-effect free
  }
}
*/

// TIP: BUNDLE OPTIMIZATION STRATEGIES:
// - Use "type" imports exclusively for types to enable better tree shaking
// - Implement dynamic imports for large components and libraries
// - Preload critical modules during idle time to improve perceived performance
// - Analyze bundle composition regularly to identify optimization opportunities
// - Configure webpack/bundler properly for optimal code splitting and tree shaking`,
        },
        {
          title: "Memory Management & Efficient Data Structures",
          description:
            "Prevent memory leaks • Optimize collections • Weak references • Object pooling • Garbage collection awareness",
          language: "typescript",
          code: `// RECOMMENDED: Memory-efficient data structures
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
  
  // PERFORMANCE: Memory usage estimation
  getMemoryUsage(): number {
    let size = 0;
    for (const [key, value] of this.cache) {
      size += this.estimateSize(key) + this.estimateSize(value);
    }
    return size;
  }
  
  private estimateSize(obj: unknown): number {
    if (typeof obj === 'string') return obj.length * 2; // UTF-16
    if (typeof obj === 'number') return 8;
    if (typeof obj === 'boolean') return 1;
    if (obj === null || obj === undefined) return 0;
    if (typeof obj === 'object') {
      return JSON.stringify(obj).length * 2; // Rough estimate
    }
    return 0;
  }
}

// RECOMMENDED: Weak references for memory management
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

// RECOMMENDED: Object pooling for frequent allocations
class ObjectPool<T> {
  private pool: T[] = [];
  private createFn: () => T;
  private resetFn: (obj: T) => void;
  private maxSize: number;
  
  constructor(
    createFn: () => T,
    resetFn: (obj: T) => void,
    initialSize: number = 10,
    maxSize: number = 100
  ) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.maxSize = maxSize;
    
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
    if (this.pool.length < this.maxSize) {
      this.resetFn(obj);
      this.pool.push(obj);
    }
    // If pool is full, let object be garbage collected
  }
  
  size(): number {
    return this.pool.length;
  }
  
  clear(): void {
    this.pool.length = 0;
  }
}

// RECOMMENDED: Memory leak detection and prevention
class MemoryLeakDetector {
  private static readonly observers = new Set<() => void>();
  private static readonly timers = new Set<number>();
  private static readonly intervals = new Set<number>();
  
  // Track event listeners for cleanup
  static addEventListener<K extends keyof DocumentEventMap>(
    element: Document | Element,
    type: K,
    listener: (event: DocumentEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): () => void {
    element.addEventListener(type, listener, options);
    
    const cleanup = () => {
      element.removeEventListener(type, listener, options);
    };
    
    this.observers.add(cleanup);
    return cleanup;
  }
  
  // Track timers for cleanup
  static setTimeout(callback: () => void, delay: number): number {
    const id = window.setTimeout(() => {
      this.timers.delete(id);
      callback();
    }, delay);
    
    this.timers.add(id);
    return id;
  }
  
  static setInterval(callback: () => void, delay: number): number {
    const id = window.setInterval(callback, delay);
    this.intervals.add(id);
    return id;
  }
  
  static clearTimeout(id: number): void {
    window.clearTimeout(id);
    this.timers.delete(id);
  }
  
  static clearInterval(id: number): void {
    window.clearInterval(id);
    this.intervals.delete(id);
  }
  
  // Clean up all tracked resources
  static cleanup(): void {
    // Clear all observers
    this.observers.forEach(cleanup => cleanup());
    this.observers.clear();
    
    // Clear all timers
    this.timers.forEach(id => window.clearTimeout(id));
    this.timers.clear();
    
    // Clear all intervals
    this.intervals.forEach(id => window.clearInterval(id));
    this.intervals.clear();
  }
  
  // Memory usage monitoring
  static getMemoryInfo(): {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
    return null;
  }
}

// RECOMMENDED: Optimized collection operations
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
    
    // Swap with last element and pop (O(1) removal)
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
  
  clear(): void {
    this.items.length = 0;
    this.indices.clear();
  }
}

// RECOMMENDED: React component memory optimization
interface ComponentCleanup {
  cleanup(): void;
}

function useMemoryOptimization(): ComponentCleanup {
  const cleanupFunctions = React.useRef<(() => void)[]>([]);
  
  const addCleanup = React.useCallback((fn: () => void) => {
    cleanupFunctions.current.push(fn);
  }, []);
  
  const cleanup = React.useCallback(() => {
    cleanupFunctions.current.forEach(fn => fn());
    cleanupFunctions.current = [];
  }, []);
  
  React.useEffect(() => {
    return cleanup; // Cleanup on unmount
  }, [cleanup]);
  
  return { cleanup };
}

// Usage examples
const stringPool = new ObjectPool(
  () => '', // Create empty string
  (str) => { /* Reset string if needed */ }, // Reset function
  20, // Initial pool size
  100 // Max pool size
);

const userCache = new LRUCache<number, User>(50);
const componentCache = new WeakCache<HTMLElement, ComponentData>();

// TIP: MEMORY OPTIMIZATION STRATEGIES:
// - Use LRU cache for frequently accessed data with size limits
// - Implement object pooling for frequently created/destroyed objects
// - Use WeakMap/WeakSet for object associations that shouldn't prevent garbage collection
// - Track and clean up event listeners, timers, and other resources in React components
// - Monitor memory usage in development to identify and fix memory leaks early`,
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
          difficulty: "expert",
          tags: ["advanced", "utility-types", "generics", "type-system"],
          code: `// RECOMMENDED: Advanced utility types for API design
type StrictOmit<T, K extends keyof T> = Omit<T, K>;
type StrictPick<T, K extends keyof T> = Pick<T, K>;

// RECOMMENDED: Deep partial for nested objects
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object 
    ? T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[P]>
    : T[P];
};

// RECOMMENDED: Type-safe path access
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

// RECOMMENDED: Event system with template literals
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

// RECOMMENDED: Builder pattern with method chaining
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

// TIP: ADVANCED PATTERNS:
// - Use conditional types for flexible APIs that adapt to input types
// - Template literals for type-safe string operations and domain-specific languages
// - Builder pattern for complex object construction with method chaining
// - Event systems with strict payload typing for type-safe communication`,
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
          code: `// RECOMMENDED: Type-safe test utilities
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

// RECOMMENDED: Type-safe mocking
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

// RECOMMENDED: Test fixtures with type safety
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

// RECOMMENDED: Comprehensive test suite
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

// RECOMMENDED: Property-based testing
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

// TIP: TESTING BEST PRACTICES:
// - Create type-safe test utilities and fixtures for consistent testing
// - Mock external dependencies with proper typing to maintain type safety
// - Test both success and error conditions to ensure robustness
// - Use property-based testing for validation logic to catch edge cases
// - Test edge cases and boundary conditions that might be missed in manual testing`,
        },
        {
          title: "Debugging & Error Investigation",
          description:
            "Type-safe logging • Debug utilities • Performance profiling • Error tracking",
          language: "typescript",
          code: `// RECOMMENDED: Type-safe logging system
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

// RECOMMENDED: Debug utilities with type information
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

// RECOMMENDED: Performance profiling
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

// RECOMMENDED: Error boundary with context
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

// RECOMMENDED: Type-safe debugging hooks
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

// TIP: DEBUGGING STRATEGIES:
// - Use structured logging with context for better error tracking
// - Profile performance-critical functions to identify bottlenecks
// - Capture errors with full context information for effective debugging
// - Use type-safe debug utilities in development to maintain type safety
// - Monitor and track errors in production for continuous improvement`,
        },
      ],
    },
  ],
};
