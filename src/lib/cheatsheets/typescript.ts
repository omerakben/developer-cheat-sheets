import { CheatSheet } from "@/types/cheatsheet";

export const typescriptCheatSheet: CheatSheet = {
  title: "TypeScript Cheat Sheet",
  description:
    "Modern TypeScript with React integration, type safety, and best practices",
  sections: [
    {
      id: "basics",
      title: "TypeScript Basics",
      description:
        "Core types, interfaces, and fundamental TypeScript concepts",
      examples: [
        {
          title: "Basic Types",
          description: "TypeScript's built-in types and type annotations",
          language: "typescript",
          code: `// Primitive types
let name: string = "TypeScript";
let age: number = 5;
let isActive: boolean = true;
let items: number[] = [1, 2, 3];
let scores: Array<number> = [95, 87, 92];

// Union types
let id: string | number = "user-123";
id = 456; // Also valid

// Literal types
let status: "loading" | "success" | "error" = "loading";
let size: "small" | "medium" | "large" = "medium";

// Any and unknown
let data: any = "could be anything";
let userInput: unknown = "safe unknown type";

// Null and undefined
let optional: string | null = null;
let maybe: string | undefined = undefined;

// Type assertion
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;`,
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
      description: "Generics, utility types, and advanced type patterns",
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
      description: "React components, hooks, and patterns with TypeScript",
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
          title: "Development Tools and Debugging",
          description:
            "TypeScript debugging, testing setup, and development utilities",
          language: "typescript",
          code: `// Development environment setup
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Type-safe environment variables
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  dbUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
} as const;

// Assertion functions for debugging
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(\`Expected string, got \${typeof value}\`);
  }
}

function assertIsUser(value: unknown): asserts value is User {
  if (!value || typeof value !== 'object') {
    throw new Error('Expected user object');
  }

  const user = value as Record<string, unknown>;
  if (typeof user.id !== 'number' || typeof user.name !== 'string') {
    throw new Error('Invalid user object structure');
  }
}

// Debug utility function
function debugLog<T>(label: string, value: T): T {
  if (isDevelopment) {
    console.group(\`🐛 \${label}\`);
    console.log('Type:', typeof value);
    console.log('Value:', value);
    console.groupEnd();
  }
  return value;
}

// Type-safe fetch wrapper
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(\`\${config.apiUrl}\${url}\`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(\`API Error: \${response.status} \${response.statusText}\`);
  }

  const data = await response.json();
  return data as T;
}

// Testing utilities with TypeScript
// jest.config.js setup for TypeScript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**/*',
  ],
};

// Type-safe test utilities
interface RenderOptions {
  preloadedState?: Partial<AppState>;
  route?: string;
}

function renderWithProviders(
  ui: React.ReactElement,
  options: RenderOptions = {}
) {
  // Test rendering implementation
}

// Mock type definitions for testing
type MockFunction<T extends (...args: any[]) => any> = jest.MockedFunction<T>;

const mockApiRequest = apiRequest as MockFunction<typeof apiRequest>;

// TypeScript compiler API usage
import * as ts from 'typescript';

function checkTypeScript(fileName: string, source: string) {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });

  return result.outputText;
}`,
        },
      ],
    },
  ],
};
