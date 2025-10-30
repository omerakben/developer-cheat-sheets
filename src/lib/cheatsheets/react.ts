import { CheatSheet } from "@/types/cheatsheet";

export const reactCheatSheet: CheatSheet = {
  title: "React Hooks & Patterns",
  description:
    "Modern React development with hooks, performance optimization, and real-world patterns. From useState to custom hooks and advanced techniques.",
  metadata: {
    lastUpdated: "2025-01-01",
    version: "1.0.0",
    author: "Developer CheatSheets",
  },
  sections: [
    {
      id: "basic-hooks",
      title: "Basic Hooks",
      description: "Essential hooks every React developer must know",
      examples: [
        {
          title: "useState - State Management",
          description:
            "Add state to functional components. The most fundamental hook.",
          code: `import { useState } from 'react';

function Counter() {
  // Simple state
  const [count, setCount] = useState(0);

  // State with object
  const [user, setUser] = useState({ name: '', age: 0 });

  // State with array
  const [items, setItems] = useState([]);

  // Lazy initial state (expensive computation)
  const [data, setData] = useState(() => {
    return expensiveComputation();
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment (functional)
      </button>

      {/* Update object state */}
      <button onClick={() => setUser({ ...user, name: 'John' })}>
        Update Name
      </button>

      {/* Update array state */}
      <button onClick={() => setItems([...items, 'new item'])}>
        Add Item
      </button>
    </div>
  );
}`,
          language: "typescript",
          difficulty: "beginner",
          tags: ["useState", "state", "basics"],
          documentationUrl: "https://react.dev/reference/react/useState",
        },
        {
          title: "useEffect - Side Effects",
          description:
            "Perform side effects like data fetching, subscriptions, and DOM manipulation.",
          code: `import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Run once on mount
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array

  // Run when id changes
  useEffect(() => {
    fetchUserData(userId);
  }, [userId]); // Runs when userId changes

  // Cleanup function
  useEffect(() => {
    const subscription = subscribeToData();

    return () => {
      // Cleanup on unmount or before next effect
      subscription.unsubscribe();
    };
  }, []);

  // Multiple effects for separation of concerns
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>{loading ? 'Loading...' : data}</div>;
}

// Common patterns
function Component() {
  // ❌ Avoid: Missing dependencies
  useEffect(() => {
    doSomething(value);
  }, []); // Should include 'value'

  // ✅ Good: Include all dependencies
  useEffect(() => {
    doSomething(value);
  }, [value]);

  // ❌ Avoid: Updating state on every render
  useEffect(() => {
    setCount(count + 1);
  }); // Infinite loop!

  // ✅ Good: Conditional updates
  useEffect(() => {
    if (condition) {
      setCount(count + 1);
    }
  }, [condition]);
}`,
          language: "typescript",
          difficulty: "beginner",
          tags: ["useEffect", "side-effects", "lifecycle"],
          documentationUrl: "https://react.dev/reference/react/useEffect",
        },
        {
          title: "useContext - Prop Drilling Solution",
          description:
            "Share data across component tree without passing props manually.",
          code: `import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();
const UserContext = createContext();

// Provider component
function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Dashboard />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// Consumer components
function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <div className={theme}>
      <h1>Welcome {user?.name}</h1>
      <ThemeToggle />
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}

// Custom hook for cleaner usage
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Now use it
function Component() {
  const { theme, setTheme } = useTheme();
  return <div>{theme}</div>;
}`,
          language: "typescript",
          difficulty: "intermediate",
          tags: ["useContext", "context", "prop-drilling"],
          documentationUrl: "https://react.dev/reference/react/useContext",
        },
      ],
    },
    {
      id: "performance-hooks",
      title: "Performance Hooks",
      description: "Optimize React apps with memoization and optimization hooks",
      examples: [
        {
          title: "useMemo - Expensive Calculations",
          description:
            "Cache expensive computation results between re-renders.",
          code: `import { useMemo, useState } from 'react';

function ProductList({ products, filterText }) {
  const [sortBy, setSortBy] = useState('name');

  // ❌ Bad: Recalculates on every render
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // ✅ Good: Only recalculates when dependencies change
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(p =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [products, filterText]);

  // Complex sorting with memo
  const sortedProducts = useMemo(() => {
    console.log('Sorting products...');
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });
  }, [filteredProducts, sortBy]);

  // Expensive calculation example
  const stats = useMemo(() => {
    return {
      total: products.length,
      average: products.reduce((sum, p) => sum + p.price, 0) / products.length,
      max: Math.max(...products.map(p => p.price)),
      min: Math.min(...products.map(p => p.price)),
    };
  }, [products]);

  return (
    <div>
      <div>Stats: {JSON.stringify(stats)}</div>
      {sortedProducts.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// When to use useMemo:
// ✅ Expensive calculations
// ✅ Preventing child re-renders
// ✅ Referential equality checks
// ❌ Simple operations (overhead not worth it)`,
          language: "typescript",
          difficulty: "intermediate",
          tags: ["useMemo", "performance", "optimization"],
          documentationUrl: "https://react.dev/reference/react/useMemo",
        },
        {
          title: "useCallback - Stable Function References",
          description:
            "Prevent unnecessary re-creation of functions, essential for child component optimization.",
          code: `import { useCallback, useState, memo } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // ❌ Bad: New function on every render
  const handleClick = () => {
    console.log('Clicked:', count);
  };

  // ✅ Good: Stable function reference
  const handleClick = useCallback(() => {
    console.log('Clicked:', count);
  }, [count]); // Recreate only when count changes

  // Common patterns
  const handleSubmit = useCallback(async (data) => {
    await api.submit(data);
    setOther(prev => prev + 1);
  }, []); // No dependencies = never recreated

  const handleUpdate = useCallback((id) => {
    setCount(prev => prev + 1); // Using updater function
  }, []); // Can exclude 'count' when using updater

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <button onClick={() => setOther(other + 1)}>
        Update Other
      </button>
    </div>
  );
}

// Child component wrapped in memo won't re-render
// unless props actually change
const ChildComponent = memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click Me</button>;
});

// Real-world example: Form with multiple fields
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Stable handler for any field
  const handleChange = useCallback((field) => {
    return (e) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    };
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    await submitForm(formData);
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange('name')} />
      <input onChange={handleChange('email')} />
      <textarea onChange={handleChange('message')} />
      <button>Submit</button>
    </form>
  );
}`,
          language: "typescript",
          difficulty: "intermediate",
          tags: ["useCallback", "performance", "memoization"],
          documentationUrl: "https://react.dev/reference/react/useCallback",
        },
        {
          title: "React.memo - Component Memoization",
          description:
            "Prevent component re-renders when props haven't changed.",
          code: `import { memo, useState } from 'react';

// ❌ Without memo: Re-renders on every parent render
function ExpensiveComponent({ value, onClick }) {
  console.log('Rendering ExpensiveComponent');
  return <div onClick={onClick}>{value}</div>;
}

// ✅ With memo: Only re-renders when props change
const ExpensiveComponent = memo(function ExpensiveComponent({ value, onClick }) {
  console.log('Rendering ExpensiveComponent');
  return <div onClick={onClick}>{value}</div>;
});

// Custom comparison function
const UserCard = memo(
  function UserCard({ user, onUpdate }) {
    return (
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button onClick={() => onUpdate(user.id)}>Update</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props changed (re-render)
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name &&
      prevProps.user.email === nextProps.user.email
    );
  }
);

// Real-world example: List optimization
function UserList() {
  const [users, setUsers] = useState([...largeUserList]);
  const [filter, setFilter] = useState('');

  const handleUpdate = useCallback((id) => {
    // Update specific user
    setUsers(prev =>
      prev.map(u => u.id === id ? { ...u, updated: true } : u)
    );
  }, []);

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter users..."
      />
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

// When to use memo:
// ✅ Expensive rendering components
// ✅ Components that receive same props often
// ✅ Large lists with many items
// ❌ Simple components (overhead not worth it)
// ❌ Props change frequently anyway`,
          language: "typescript",
          difficulty: "intermediate",
          tags: ["memo", "performance", "re-render"],
        },
      ],
    },
    {
      id: "advanced-hooks",
      title: "Advanced Hooks",
      description: "useRef, useReducer, and other advanced patterns",
      examples: [
        {
          title: "useRef - DOM Access & Mutable Values",
          description:
            "Access DOM elements directly and store mutable values without triggering re-renders.",
          code: `import { useRef, useEffect, useState } from 'react';

function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}

// Store mutable values (doesn't trigger re-render)
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

// Track previous value
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Counter({ count }) {
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>
      <p>Changed: {count !== previousCount ? 'Yes' : 'No'}</p>
    </div>
  );
}

// Avoid re-renders with callback refs
function MeasureComponent() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div ref={measuredRef}>
      <p>Height: {height}px</p>
    </div>
  );
}`,
          language: "typescript",
          difficulty: "intermediate",
          tags: ["useRef", "DOM", "mutable"],
          documentationUrl: "https://react.dev/reference/react/useRef",
        },
        {
          title: "useReducer - Complex State Logic",
          description:
            "Manage complex state with actions and reducer pattern, similar to Redux.",
          code: `import { useReducer } from 'react';

// Define action types
const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset',
  SET: 'set',
};

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    case ACTIONS.RESET:
      return { count: 0 };
    case ACTIONS.SET:
      return { count: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>
        +
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>
        -
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.SET, payload: 100 })}>
        Set to 100
      </button>
    </div>
  );
}

// Real-world example: Form state management
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SUBMIT':
      return {
        ...state,
        isSubmitting: true,
        error: null,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        submitted: true,
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        error: action.error,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  name: '',
  email: '',
  message: '',
  isSubmitting: false,
  submitted: false,
  error: null,
};

function ContactForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field) => (e) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT' });

    try {
      await submitForm(state);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SUBMIT_ERROR', error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={state.name} onChange={handleChange('name')} />
      <input value={state.email} onChange={handleChange('email')} />
      <textarea value={state.message} onChange={handleChange('message')} />
      <button disabled={state.isSubmitting}>
        {state.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      {state.error && <div className="error">{state.error}</div>}
    </form>
  );
}

// When to use useReducer vs useState:
// useState: Simple independent state
// useReducer: Complex state with multiple sub-values
// useReducer: State transitions depend on previous state
// useReducer: Complex state update logic`,
          language: "typescript",
          difficulty: "advanced",
          tags: ["useReducer", "state-management", "complex-state"],
          documentationUrl: "https://react.dev/reference/react/useReducer",
        },
      ],
    },
    {
      id: "custom-hooks",
      title: "Custom Hooks",
      description: "Build reusable logic with custom hooks",
      examples: [
        {
          title: "useFetch - Data Fetching Hook",
          description:
            "Reusable hook for API calls with loading and error states.",
          code: `import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort(); // Cleanup
  }, [url]); // Re-fetch when URL changes

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(
    \`https://api.example.com/users/\${userId}\`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,
          language: "typescript",
          difficulty: "intermediate",
          tags: ["custom-hook", "fetch", "data-fetching"],
        },
        {
          title: "useLocalStorage - Persistent State",
          description:
            "Sync state with localStorage for persistence across sessions.",
          code: `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use default
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = (value) => {
    try {
      // Allow value to be a function for same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);
  const [user, setUser] = useLocalStorage('user', null);

  return (
    <div>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme (Current: {theme})
      </button>
      <button onClick={() => setFontSize(f => f + 1)}>
        Increase Font Size ({fontSize}px)
      </button>
    </div>
  );
}`,
          language: "typescript",
          difficulty: "intermediate",
          tags: ["custom-hook", "localStorage", "persistence"],
        },
        {
          title: "useDebounce - Performance Optimization",
          description:
            "Delay expensive operations until user stops typing/interacting.",
          code: `import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout to update debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel timeout if value changes before delay
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage: Search with API call
function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [results, setResults] = useState([]);

  // Only trigger search when debounced value changes
  useEffect(() => {
    if (debouncedSearch) {
      searchAPI(debouncedSearch).then(setResults);
    }
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />
      <p>Searching for: {debouncedSearch}</p>
      {results.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// Real-world: Form validation with debounce
function SignupForm() {
  const [email, setEmail] = useState('');
  const debouncedEmail = useDebounce(email, 1000);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);

  useEffect(() => {
    if (debouncedEmail) {
      setIsChecking(true);
      checkEmailAvailability(debouncedEmail)
        .then(available => {
          setIsAvailable(available);
          setIsChecking(false);
        });
    }
  }, [debouncedEmail]);

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {isChecking && <span>Checking...</span>}
      {isAvailable === true && <span>✓ Available</span>}
      {isAvailable === false && <span>✗ Already taken</span>}
    </div>
  );
}`,
          language: "typescript",
          difficulty: "intermediate",
          tags: ["custom-hook", "debounce", "performance"],
        },
        {
          title: "useMediaQuery - Responsive Design",
          description:
            "Detect screen size changes and create responsive components.",
          code: `import { useState, useEffect } from 'react';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

// Usage
function ResponsiveComponent() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div>
      {isDesktop && <DesktopNav />}
      {isTablet && <TabletNav />}
      {isMobile && <MobileNav />}
      <p>Dark mode: {isDarkMode ? 'Yes' : 'No'}</p>
    </div>
  );
}

// Helper: useBreakpoint
function useBreakpoint() {
  const breakpoints = {
    mobile: useMediaQuery('(max-width: 767px)'),
    tablet: useMediaQuery('(min-width: 768px) and (max-width: 1023px)'),
    desktop: useMediaQuery('(min-width: 1024px)'),
  };

  return breakpoints;
}`,
          language: "typescript",
          difficulty: "intermediate",
          tags: ["custom-hook", "responsive", "media-query"],
        },
      ],
    },
    {
      id: "patterns",
      title: "React Patterns & Best Practices",
      description: "Advanced patterns for scalable React applications",
      examples: [
        {
          title: "Compound Components Pattern",
          description:
            "Create flexible, composable components that work together.",
          code: `import { createContext, useContext, useState } from 'react';

// Context for sharing state between compound components
const TabsContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === id;

  return (
    <button
      className={isActive ? 'tab active' : 'tab'}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== id) return null;

  return <div className="tab-panel">{children}</div>;
}

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage - Clean and flexible!
function App() {
  return (
    <Tabs defaultTab="profile">
      <Tabs.List>
        <Tabs.Tab id="profile">Profile</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
        <Tabs.Tab id="notifications">Notifications</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel id="profile">
        <h2>Profile Content</h2>
      </Tabs.Panel>
      <Tabs.Panel id="settings">
        <h2>Settings Content</h2>
      </Tabs.Panel>
      <Tabs.Panel id="notifications">
        <h2>Notifications Content</h2>
      </Tabs.Panel>
    </Tabs>
  );
}`,
          language: "typescript",
          difficulty: "advanced",
          tags: ["pattern", "compound-components", "composition"],
        },
        {
          title: "Render Props Pattern",
          description:
            "Share code between components using a prop whose value is a function.",
          code: `import { useState } from 'react';

// Mouse tracker with render props
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ height: '100vh' }}
    >
      {render(position)}
    </div>
  );
}

// Usage - Flexible rendering!
function App() {
  return (
    <div>
      <h1>Move the mouse around</h1>

      {/* Render coordinates */}
      <MouseTracker
        render={({ x, y }) => (
          <p>Position: ({x}, {y})</p>
        )}
      />

      {/* Render custom component */}
      <MouseTracker
        render={({ x, y }) => (
          <div
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'red',
            }}
          />
        )}
      />
    </div>
  );
}

// Alternative: Children as function
function DataFetcher({ url, children }) {
  const { data, loading, error } = useFetch(url);
  return children({ data, loading, error });
}

// Usage
<DataFetcher url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <Error message={error} />;
    return <UserList users={data} />;
  }}
</DataFetcher>`,
          language: "typescript",
          difficulty: "advanced",
          tags: ["pattern", "render-props", "flexibility"],
        },
        {
          title: "Error Boundaries",
          description:
            "Catch JavaScript errors in component tree and display fallback UI.",
          code: `import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary
      fallback={<div>Oops! Something went wrong</div>}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}

// Multiple error boundaries for granular error handling
function ComplexApp() {
  return (
    <div>
      <ErrorBoundary fallback={<HeaderError />}>
        <Header />
      </ErrorBoundary>

      <ErrorBoundary fallback={<SidebarError />}>
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary fallback={<ContentError />}>
        <MainContent />
      </ErrorBoundary>
    </div>
  );
}

// Note: Error boundaries don't catch:
// - Event handlers (use try/catch)
// - Asynchronous code (setTimeout, promises)
// - Server-side rendering
// - Errors in error boundary itself`,
          language: "typescript",
          difficulty: "advanced",
          tags: ["error-boundary", "error-handling", "reliability"],
          documentationUrl: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
        },
      ],
    },
  ],
};
