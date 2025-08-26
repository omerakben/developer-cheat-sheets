import { CheatSheet } from "@/types/cheatsheet";

export const typescriptCheatSheet: CheatSheet = {
  title: "TypeScript Cheat Sheet",
  description:
    "Strategic TypeScript guide for mid-level developers • Security-first approach • Performance patterns • Type safety best practices",
  sections: [
    {
      id: "essentials-security",
      title: "TypeScript Essentials & Security",
      description:
        "Type safety for security • Input validation • Safe coding patterns • Prevent runtime errors",
      examples: [
        {
          title: "Type Safety & Security-First Patterns",
          description:
            "Strict types prevent injection • Input validation • Runtime type checking • Null safety patterns",
          language: "typescript",
          code: `// 🔒 SECURITY: Strict types prevent injection attacks
interface SafeUserInput {
  readonly username: string;
  readonly email: string;
  readonly age: number;
}

// ✅ Always validate external input with type guards
function isValidUserInput(input: unknown): input is SafeUserInput {
  return (
    typeof input === 'object' &&
    input !== null &&
    typeof (input as any).username === 'string' &&
    typeof (input as any).email === 'string' &&
    typeof (input as any).age === 'number' &&
    (input as any).age > 0 &&
    (input as any).age < 150 &&
    (input as any).email.includes('@')
  );
}

// 🔒 Safe user input processing
function processUserRegistration(rawInput: unknown): SafeUserInput | null {
  if (!isValidUserInput(rawInput)) {
    console.error('Invalid user input detected');
    return null;
  }
  
  // Now TypeScript knows the type is safe
  return {
    username: rawInput.username.trim().toLowerCase(),
    email: rawInput.email.trim().toLowerCase(),
    age: rawInput.age
  };
}

// ✅ Literal types for controlled values - prevents injection
type UserRole = 'admin' | 'user' | 'guest';
type ApiEndpoint = '/api/users' | '/api/orders' | '/api/products';

// 🔒 Template literal types for safe string construction
type SafeUrl = \`\${ApiEndpoint}?id=\${number}\`;

// 💡 WHEN TO USE: Always validate external data (APIs, forms, localStorage)
// 💡 WHY: TypeScript types are compile-time only - runtime validation is essential`,
        },
        {
          title: "Defensive Programming with Types",
          description:
            "Null safety • Optional chaining • Type assertions • Error boundaries • Comprehensive validation",
          language: "typescript",
          code: `// 🔒 SECURITY: Null safety patterns - prevent runtime crashes
interface User {
  id: number;
  name: string;
  email?: string; // Optional - could be undefined
  profile?: {
    avatar?: string;
    bio?: string;
  };
}

// ✅ Safe property access with optional chaining
function getUserAvatarUrl(user: User | null | undefined): string | null {
  // Type-safe navigation through potentially null/undefined properties
  return user?.profile?.avatar ?? null;
}

// ✅ Non-null assertion with validation
function getValidatedEmail(user: User): string {
  if (!user.email) {
    throw new Error('User email is required but not provided');
  }
  // Now TypeScript knows email is definitely string
  return user.email;
}

// 🔒 Safe type assertions with validation
function parseJsonSafely<T>(jsonStr: string, validator: (data: unknown) => data is T): T | null {
  try {
    const parsed: unknown = JSON.parse(jsonStr);
    if (validator(parsed)) {
      return parsed;
    }
    console.error('JSON validation failed');
    return null;
  } catch (error) {
    console.error('JSON parsing failed:', error);
    return null;
  }
}

// ✅ Discriminated unions for error handling
type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code: number };

function handleApiResult<T>(result: ApiResult<T>): T | null {
  if (result.success) {
    return result.data; // TypeScript knows this is T
  } else {
    console.error(\`API Error \${result.code}: \${result.error}\`);
    return null;
  }
}

// 🔒 Strict configuration for security
// Enable in tsconfig.json:
// "strict": true,
// "noUncheckedIndexedAccess": true,
// "exactOptionalPropertyTypes": true

// 💡 SECURITY BEST PRACTICES:
// - Use optional chaining (?.) for safe property access
// - Validate before type assertions
// - Use discriminated unions for error states
// - Enable strict TypeScript options
// - Never ignore compiler warnings`,
        },
        {
          title: "Strict Function Signatures & Input Validation",
          description:
            "Type-safe functions • Parameter validation • Return type safety • Overload patterns",
          language: "typescript",
          code: `// ✅ Strict function signatures with validation
function createUser(
  name: string,
  email: string,
  age?: number
): { success: true; user: User } | { success: false; error: string } {
  // Input validation
  if (!name.trim()) {
    return { success: false, error: 'Name cannot be empty' };
  }
  
  if (!email.includes('@')) {
    return { success: false, error: 'Invalid email format' };
  }
  
  if (age !== undefined && (age < 0 || age > 150)) {
    return { success: false, error: 'Age must be between 0 and 150' };
  }
  
  return {
    success: true,
    user: {
      id: Math.random(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      age
    }
  };
}

// 🔒 Safe array operations with proper typing
function safeArrayAccess<T>(array: readonly T[], index: number): T | undefined {
  if (index < 0 || index >= array.length) {
    return undefined;
  }
  return array[index];
}

// ⚡ PERFORMANCE: Function overloads for optimization
function processData(data: string): string;
function processData(data: number): number;
function processData(data: string[]): string[];
function processData(data: string | number | string[]): string | number | string[] {
  if (typeof data === 'string') {
    return data.trim().toUpperCase(); // Optimized string processing
  }
  if (typeof data === 'number') {
    return data * 2; // Fast numeric operation
  }
  return data.map(item => item.trim()); // Batch array processing
}

// ✅ Generic constraints for type safety
interface Identifiable {
  id: string | number;
}

function findById<T extends Identifiable>(
  items: readonly T[],
  id: string | number
): T | undefined {
  return items.find(item => item.id === id);
}

// 🔒 Branded types for additional security
type UserId = string & { readonly __brand: 'UserId' };
type EmailAddress = string & { readonly __brand: 'EmailAddress' };

function createUserId(value: string): UserId | null {
  if (value.length < 3 || value.length > 50) {
    return null;
  }
  return value as UserId;
}

function sendEmail(to: EmailAddress, subject: string): Promise<void> {
  // TypeScript ensures only validated emails can be passed
  return fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify({ to, subject })
  }).then(() => undefined);
}

// 💡 WHEN TO USE:
// - Function overloads: When same operation works on different types
// - Branded types: When you need extra validation beyond basic types
// - Result types: Instead of throwing errors for expected failures
// - Generic constraints: When you need specific properties on generic types`,
        },
      ],
    },
    {
      id: "performance-type-system", 
      title: "Performance & Type System Optimization",
      description:
        "Efficient types • Compiler optimizations • Memory considerations • Build performance",
      examples: [
        {
          title: "High-Performance Type Patterns",
          description:
            "Optimize compilation • Efficient utility types • Avoid expensive operations • Memory-conscious patterns",
          language: "typescript",
          code: `// ⚡ PERFORMANCE: Prefer interfaces over type aliases for objects
interface User {  // ✅ Faster compilation, better error messages
  id: number;
  name: string;
  email: string;
}

// ❌ Slower for complex object types
// type User = { id: number; name: string; email: string; }

// ⚡ Efficient union types - order matters for performance
type Status = 'active' | 'inactive' | 'pending' | 'suspended';
// Put most common values first for faster type checking

// ✅ Const assertions for immutable data - prevents unnecessary copying
const USER_ROLES = ['admin', 'user', 'guest'] as const;
type UserRole = typeof USER_ROLES[number]; // 'admin' | 'user' | 'guest'

const API_ENDPOINTS = {
  users: '/api/users',
  orders: '/api/orders',
  products: '/api/products'
} as const;
type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

// ⚡ Efficient mapped types - avoid expensive recursion
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// ❌ Avoid deeply recursive types (can cause compilation timeouts)
// type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]; }

// ✅ Use conditional types efficiently 
type NonNullable<T> = T extends null | undefined ? never : T;

// ⚡ Template literal performance optimization
type EventName = 'click' | 'focus' | 'blur';
type Handler<T extends EventName> = \`on\${Capitalize<T>}\`;
// Results in: 'onClick' | 'onFocus' | 'onBlur'

// 🔍 COMPILER PERFORMANCE: Use module augmentation sparingly
declare module 'some-library' {
  interface ExistingInterface {
    newProperty: string;
  }
}

// 💡 PERFORMANCE TIPS:
// - Use interfaces for object shapes
// - Prefer const assertions over union types
// - Limit template literal type complexity
// - Avoid deep recursive types
// - Use branded types sparingly`,
        },
        {
          title: "Strategic Utility Types & Advanced Patterns",
          description:
            "Built-in utilities • Custom type utilities • Type-level programming • Conditional logic",
          language: "typescript",
          code: `// ⚡ PERFORMANCE: Efficient utility type usage
interface UserProfile {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  lastLogin: Date;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

// ✅ Strategic use of Pick for API types
type PublicUserProfile = Pick<UserProfile, 'id' | 'name' | 'email' | 'role'>;
type UserPreferences = Pick<UserProfile, 'preferences'>['preferences'];

// ✅ Omit for creating safe update types
type UserUpdateData = Omit<UserProfile, 'id' | 'password' | 'lastLogin'>;

// ⚡ Custom utility types for common patterns
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type DataOnly<T> = Pick<T, NonFunctionKeys<T>>;

// 🔒 Security-focused utility types
type SanitizedInput<T> = {
  [K in keyof T]: T[K] extends string 
    ? string  // All strings are sanitized
    : T[K] extends number 
    ? number  // Numbers are validated
    : never;  // Reject other types
};

// ✅ Conditional types for API responses
type ApiResponse<T> = T extends any[]
  ? { data: T; total: number; page: number }
  : { data: T };

type UserListResponse = ApiResponse<User[]>;
// Result: { data: User[]; total: number; page: number }

type SingleUserResponse = ApiResponse<User>;
// Result: { data: User }

// ⚡ Template literal magic for type safety
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiPath = '/users' | '/orders' | '/products';
type ApiRoute = \`\${HttpMethod} \${ApiPath}\`;

// Results in: 'GET /users' | 'POST /users' | 'PUT /users' | etc.

// ✅ Recursive type patterns (use carefully for performance)
type NestedKeyOf<T> = {
  [K in keyof T]: T[K] extends object 
    ? K | \`\${string & K}.\${NestedKeyOf<T[K]>}\`
    : K;
}[keyof T];

type UserProfilePaths = NestedKeyOf<UserProfile>;
// Results in: 'id' | 'name' | 'preferences.theme' | 'preferences.notifications' | etc.

// 💡 ADVANCED PATTERNS:
// - Use Pick/Omit for API boundary types
// - Create custom utilities for repeated patterns  
// - Template literals for compile-time validation
// - Conditional types for polymorphic APIs
// - Be careful with recursive types (compilation performance)`,
        },
      ],
    },
    {
      id: "react-performance",
      title: "React Performance Patterns",
      description:
        "Optimized React patterns • Hook performance • Component optimization • Memory management",
      examples: [
        {
          title: "High-Performance React Components",
          description:
            "Memo patterns • Callback optimization • Efficient prop drilling • Component splitting",
          language: "tsx",
          code: `import React, { memo, useMemo, useCallback, useState } from 'react';

// ⚡ PERFORMANCE: Memo for expensive components
interface UserCardProps {
  user: User;
  onUserUpdate: (id: number, data: Partial<User>) => void;
}

const UserCard = memo<UserCardProps>(({ user, onUserUpdate }) => {
  console.log('UserCard rendering for user:', user.id); // Only logs when props change
  
  // ✅ Stable callback reference
  const handleUpdate = useCallback((data: Partial<User>) => {
    onUserUpdate(user.id, data);
  }, [user.id, onUserUpdate]);
  
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => handleUpdate({ lastLogin: new Date() })}>
        Update Login
      </button>
    </div>
  );
});

// 🔒 SECURITY: Proper prop validation for components
interface SafeProps {
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const SafeWrapper: React.FC<SafeProps> = ({ children, className, ...props }) => {
  // Only allow specific props to prevent injection
  const sanitizedProps = {
    'data-testid': props['data-testid']
  };
  
  return (
    <div className={className} {...sanitizedProps}>
      {children}
    </div>
  );
};

// ⚡ Generic list component with performance optimization
interface ListProps<T> {
  items: readonly T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  className?: string;
}

function VirtualizedList<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  className 
}: ListProps<T>) {
  // ✅ Memoize expensive computations
  const itemCount = useMemo(() => items.length, [items.length]);
  
  // ✅ Only render visible items for large lists
  const visibleItems = useMemo(() => {
    // In real implementation, calculate based on scroll position
    return items.slice(0, 100); // Limit rendering for performance
  }, [items]);
  
  return (
    <div className={className} role="list">
      {visibleItems.map((item, index) => (
        <div key={keyExtractor(item)} role="listitem">
          {renderItem(item, index)}
        </div>
      ))}
      {itemCount > 100 && (
        <div>... and {itemCount - 100} more items</div>
      )}
    </div>
  );
}

// 💡 PERFORMANCE TIPS:
// - Use React.memo for components that render frequently
// - Memoize expensive calculations with useMemo
// - Use useCallback for stable function references
// - Split large components into smaller ones
// - Implement virtualization for large lists`,
        },
        {
          title: "Type-Safe React Hooks & State Management",
          description:
            "Hook optimization • State management • Custom hooks • Effect dependencies",
          language: "tsx",
          code: `import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// ⚡ PERFORMANCE: Optimized state management
interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [state, setState] = useState<UserState>({
    data: null,
    loading: false,
    error: null
  });
  
  // ✅ Stable state updater functions
  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);
  
  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);
  
  const setUserData = useCallback((data: User | null) => {
    setState(prev => ({ ...prev, data, loading: false, error: null }));
  }, []);
  
  // ⚡ Efficient data fetching with cleanup
  useEffect(() => {
    let isCancelled = false;
    
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        }
        
        const userData: User = await response.json();
        
        if (!isCancelled) {
          setUserData(userData);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error instanceof Error ? error.message : 'Unknown error');
        }
      }
    };
    
    fetchUser();
    
    return () => {
      isCancelled = true;
    };
  }, [userId, setLoading, setError, setUserData]);
  
  // ✅ Memoized computed values
  const userDisplayName = useMemo(() => {
    if (!state.data) return 'Unknown User';
    return \`\${state.data.name} (\${state.data.email})\`;
  }, [state.data]);
  
  // ✅ Stable refs for DOM elements
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);
  
  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;
  if (!state.data) return <div>No user found</div>;
  
  return (
    <div>
      <h2>{userDisplayName}</h2>
      <input ref={inputRef} placeholder="Search..." />
      <button onClick={focusInput}>Focus Search</button>
    </div>
  );
};

// ✅ Custom hook with proper typing and optimization
interface UseApiOptions {
  immediate?: boolean;
  retries?: number;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  reset: () => void;
}

function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const { immediate = true, retries = 0 } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async (retryCount = 0) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}\`);
      }
      
      const result: T = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      if (retryCount < retries) {
        // Exponential backoff
        setTimeout(() => fetchData(retryCount + 1), Math.pow(2, retryCount) * 1000);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [url, retries]);
  
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);
  
  return { data, loading, error, refetch: fetchData, reset };
}

// 💡 REACT PERFORMANCE BEST PRACTICES:
// - Use useCallback for stable function references
// - Use useMemo for expensive computations
// - Include all dependencies in effect arrays
// - Use refs for DOM manipulation
// - Implement proper cleanup in useEffect`,
        },
      ],
    },
    {
      id: "error-handling",
      title: "Error Handling & Robustness",
      description:
        "Type-safe error handling • Validation patterns • Defensive programming • Result types",
      examples: [
        {
          title: "Strategic Error Handling Patterns",
          description:
            "Result types • Error boundaries • Validation chains • Defensive coding",
          language: "typescript",
          code: `// ✅ Result type pattern for type-safe error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// 🔒 SECURITY: Comprehensive input validation
interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
  age: number;
}

function validateUserRegistration(input: unknown): Result<UserRegistrationData, string> {
  if (!input || typeof input !== 'object') {
    return { success: false, error: 'Invalid input format' };
  }
  
  const data = input as Record<string, unknown>;
  
  // Username validation
  if (typeof data.username !== 'string' || data.username.length < 3) {
    return { success: false, error: 'Username must be at least 3 characters' };
  }
  
  // Email validation
  if (typeof data.email !== 'string' || !data.email.includes('@')) {
    return { success: false, error: 'Invalid email format' };
  }
  
  // Password validation
  if (typeof data.password !== 'string' || data.password.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters' };
  }
  
  // Age validation
  if (typeof data.age !== 'number' || data.age < 13 || data.age > 120) {
    return { success: false, error: 'Age must be between 13 and 120' };
  }
  
  return {
    success: true,
    data: {
      username: data.username.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      age: data.age
    }
  };
}

// ✅ Safe API call with comprehensive error handling
async function safeApiCall<T>(
  url: string,
  options?: RequestInit
): Promise<Result<T, string>> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      // Handle different HTTP error codes
      switch (response.status) {
        case 401:
          return { success: false, error: 'Unauthorized - please log in' };
        case 403:
          return { success: false, error: 'Forbidden - insufficient permissions' };
        case 404:
          return { success: false, error: 'Resource not found' };
        case 429:
          return { success: false, error: 'Rate limit exceeded - try again later' };
        case 500:
          return { success: false, error: 'Server error - please try again' };
        default:
          return { success: false, error: \`HTTP \${response.status}: \${response.statusText}\` };
      }
    }
    
    const data: T = await response.json();
    return { success: true, data };
    
  } catch (error) {
    if (error instanceof TypeError) {
      return { success: false, error: 'Network error - check your connection' };
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

// ✅ Chain operations safely with Result type
async function registerUser(rawInput: unknown): Promise<Result<User, string>> {
  // Step 1: Validate input
  const validationResult = validateUserRegistration(rawInput);
  if (!validationResult.success) {
    return validationResult;
  }
  
  // Step 2: Check if user exists
  const checkResult = await safeApiCall<{ exists: boolean }>(\`/api/users/exists?username=\${validationResult.data.username}\`);
  if (!checkResult.success) {
    return checkResult;
  }
  
  if (checkResult.data.exists) {
    return { success: false, error: 'Username already exists' };
  }
  
  // Step 3: Create user
  const createResult = await safeApiCall<User>('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validationResult.data)
  });
  
  return createResult;
}

// ✅ Usage with proper error handling
async function handleUserRegistration(formData: FormData) {
  const result = await registerUser(Object.fromEntries(formData));
  
  if (result.success) {
    console.log('User created successfully:', result.data);
    // Redirect to success page
  } else {
    console.error('Registration failed:', result.error);
    // Show error message to user
  }
}

// 💡 ERROR HANDLING BEST PRACTICES:
// - Use Result types instead of throwing exceptions
// - Validate all external input
// - Provide specific error messages
// - Handle different error types appropriately
// - Chain operations safely with early returns`,
        },
      ],
    },
    {
      id: "testing-development",
      title: "Testing & Development Workflow",
      description:
        "Type-safe testing • Development tooling • Debugging patterns • Production optimization",
      examples: [
        {
          title: "Strategic Testing with TypeScript",
          description:
            "Type-safe tests • Mock patterns • Test utilities • Coverage strategies",
          language: "typescript",
          code: `// ✅ Type-safe test utilities
interface TestUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Test data factories with types
function createTestUser(overrides: Partial<TestUser> = {}): TestUser {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    ...overrides
  };
}

// ✅ Mock function types for testing
type MockApiFunction = jest.MockedFunction<typeof fetch>;

describe('User API', () => {
  let mockFetch: MockApiFunction;
  
  beforeEach(() => {
    mockFetch = fetch as MockApiFunction;
    mockFetch.mockClear();
  });
  
  it('should handle successful user creation', async () => {
    const testUser = createTestUser({ name: 'Alice' });
    
    // Type-safe mock response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => testUser,
    } as Response);
    
    const result = await registerUser({
      username: 'alice',
      email: 'alice@example.com',
      password: 'password123',
      age: 25
    });
    
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Alice');
    }
  });
  
  it('should handle validation errors', async () => {
    const result = await registerUser({
      username: 'ab', // Too short
      email: 'invalid-email',
      password: '123',
      age: 10
    });
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('Username must be at least 3 characters');
    }
  });
});

// ✅ Custom test assertions with TypeScript
function assertIsSuccess<T>(result: Result<T, string>): asserts result is { success: true; data: T } {
  if (!result.success) {
    throw new Error(\`Expected success but got error: \${result.error}\`);
  }
}

function assertIsError<T>(result: Result<T, string>): asserts result is { success: false; error: string } {
  if (result.success) {
    throw new Error('Expected error but got success');
  }
}

// Usage in tests
it('should create user successfully', async () => {
  const result = await registerUser(validUserData);
  assertIsSuccess(result);
  
  // Now TypeScript knows result.data exists
  expect(result.data.id).toBeGreaterThan(0);
});

// 💡 TESTING BEST PRACTICES:
// - Use type-safe test utilities
// - Create typed mock functions
// - Test both success and error cases
// - Use custom assertions for common patterns
// - Maintain test data factories with types`,
        },
        {
          title: "Production-Ready TypeScript Configuration",
          description:
            "Optimal tsconfig • Build optimization • Development workflow • Performance monitoring",
          language: "typescript",
          code: `// tsconfig.json - Production-optimized configuration
{
  "compilerOptions": {
    // ⚡ PERFORMANCE: Core compilation options
    "target": "ES2022",
    "module": "ESNext", 
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "moduleResolution": "bundler",
    "allowJs": true,
    "skipLibCheck": true, // Skip .d.ts files for faster compilation
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    // 🔒 SECURITY: Strict type checking options
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true, // Prevents array access without bounds checking

    // ⚡ PERFORMANCE: Path mapping for faster imports
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"]
    },

    // React configuration
    "jsx": "react-jsx",
    "jsxImportSource": "react",

    // Build optimization
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
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
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx"
  ]
}

// ✅ Development environment setup
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Type-safe environment variables
interface EnvironmentConfig {
  readonly API_URL: string;
  readonly APP_VERSION: string;
  readonly DEBUG_MODE: boolean;
}

function getEnvironmentConfig(): EnvironmentConfig {
  const apiUrl = process.env.REACT_APP_API_URL;
  const appVersion = process.env.REACT_APP_VERSION || '1.0.0';
  const debugMode = process.env.REACT_APP_DEBUG === 'true';

  if (!apiUrl) {
    throw new Error('REACT_APP_API_URL environment variable is required');
  }

  return {
    API_URL: apiUrl,
    APP_VERSION: appVersion,
    DEBUG_MODE: debugMode
  };
}

export const config = getEnvironmentConfig();

// ✅ Performance monitoring utility
interface PerformanceEntry {
  name: string;
  duration: number;
  timestamp: number;
}

class PerformanceMonitor {
  private entries: PerformanceEntry[] = [];

  measure<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const duration = performance.now() - start;

    this.entries.push({
      name,
      duration,
      timestamp: Date.now()
    });

    if (config.DEBUG_MODE && duration > 100) {
      console.warn(\`Slow operation detected: \${name} took \${duration.toFixed(2)}ms\`);
    }

    return result;
  }

  getReport(): PerformanceEntry[] {
    return [...this.entries];
  }

  clearEntries(): void {
    this.entries = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

// ✅ Development debugging utilities
function createLogger(prefix: string) {
  return {
    debug: (message: string, ...args: any[]) => {
      if (config.DEBUG_MODE) {
        console.debug(\`[\${prefix}] \${message}\`, ...args);
      }
    },
    info: (message: string, ...args: any[]) => {
      console.info(\`[\${prefix}] \${message}\`, ...args);
    },
    warn: (message: string, ...args: any[]) => {
      console.warn(\`[\${prefix}] \${message}\`, ...args);
    },
    error: (message: string, ...args: any[]) => {
      console.error(\`[\${prefix}] \${message}\`, ...args);
    }
  };
}

export const logger = createLogger('App');

// 💡 PRODUCTION BEST PRACTICES:
// - Enable all strict TypeScript options
// - Use path mapping for cleaner imports
// - Set up performance monitoring
// - Configure proper build optimization
// - Implement type-safe environment configuration
// - Use incremental compilation for faster builds`,
        },
      ],
    },
  ],
};
