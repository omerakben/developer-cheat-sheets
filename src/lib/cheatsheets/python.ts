import { CheatSheet } from "@/types/cheatsheet";

export const pythonCheatSheet: CheatSheet = {
  title: "Python Cheat Sheet",
  description:
    "Strategic Python guide for mid-level developers • Security-first approach • Performance patterns • Best practices",
  sections: [
    {
      id: "essentials-security",
      title: "Python Essentials & Security",
      description:
        "Core concepts with security-first approach • Type safety • Input validation • Safe coding patterns",
      examples: [
        {
          title: "Type Safety & Variable Handling",
          description:
            "Type hints for maintainability • Helps catch bugs early • Required in teams • Prevents injection issues",
          language: "python",
          code: `# Type hints for better code - ALWAYS use in production
from typing import Optional, List, Dict, Union

# RECOMMENDED: Always use type hints for function parameters
def process_user_data(name: str, age: int, active: bool = True) -> Dict[str, Union[str, int, bool]]:
    return {"name": name, "age": age, "active": active}

# RECOMMENDED: Optional types for nullable values
def find_user(user_id: int) -> Optional[Dict[str, str]]:
    # Return None if not found, dict if found
    return None

# RECOMMENDED: Collections with types
usernames: List[str] = ["alice", "bob", "charlie"]
user_scores: Dict[str, int] = {"alice": 100, "bob": 85}

# SECURITY: Always validate input types
def safe_age_check(age_input: str) -> bool:
    """Validate age input to prevent injection/overflow attacks."""
    try:
        age = int(age_input)
        return 0 <= age <= 150  # Reasonable age range
    except ValueError:
        return False  # Invalid input

# TIP: WHEN TO USE: Type hints are essential for team projects,
# help IDEs catch errors, and improve code maintainability`,
        },
        {
          title: "Secure String Handling & Input Validation",
          description:
            "Always sanitize user input • Prevent injection attacks • Use regex for validation • Escape HTML content",
          language: "python",
          code: `import re
import html
from typing import Optional

# SECURITY: Always validate and sanitize user input
def sanitize_username(username: str) -> Optional[str]:
    """Only allow alphanumeric and underscore - prevents injection."""
    if re.match(r'^[a-zA-Z0-9_]{3,20}$', username):
        return username.lower()
    return None

def sanitize_html_input(user_input: str) -> str:
    """Escape HTML to prevent XSS attacks."""
    return html.escape(user_input.strip())

# RECOMMENDED: String formatting - prefer f-strings for readability and safety
name = "Alice"
age = 30
message = f"User {name} is {age} years old"  # Modern, safe

# AVOID: % formatting for user input (injection risk)
# message = "User %s is %d years old" % (name, age)  # Old, risky

# SECURITY: Safe file path handling
import os
def safe_file_path(user_filename: str) -> Optional[str]:
    """Prevent directory traversal attacks."""
    if '..' in user_filename or '/' in user_filename:
        return None
    return os.path.join('/safe/directory', user_filename)

# TIP: WHEN TO USE: Always validate external input - forms, APIs, files
# TIP: WHY: Prevents SQL injection, XSS, path traversal attacks
# TIP: COMMON MISTAKE: Trusting user input without validation`,
        },
        {
          title: "Numbers & Performance-Aware Math",
          description:
            "Choose right numeric types • Understand precision limits • Use math module for accuracy • Profile numeric operations",
          language: "python",
          code: `import math
import decimal
from fractions import Fraction

# PERFORMANCE: Basic arithmetic with performance considerations
x = 10
y = 3

print(x + y)    # 13 (addition)
print(x - y)    # 7 (subtraction)
print(x * y)    # 30 (multiplication - fastest operation)
print(x / y)    # 3.333... (division - slower than multiplication)
print(x // y)   # 3 (floor division - faster than regular division)
print(x % y)    # 1 (modulo - useful for cycling)
print(x ** y)   # 1000 (exponentiation - use math.pow() for floats)

# TIP: PERFORMANCE: Use appropriate functions
print(pow(2, 3))        # 8 (built-in, good for integers)
print(math.pow(2, 3))   # 8.0 (returns float, use for float operations)
print(2 ** 3)           # 8 (fastest for small integers)

# SECURITY: PRECISION: Use Decimal for financial calculations
price = decimal.Decimal('19.99')
tax = decimal.Decimal('0.08')
total = price * (1 + tax)  # Precise decimal arithmetic

# RECOMMENDED: Safe division with validation
def safe_divide(a: float, b: float) -> Optional[float]:
    if b == 0:
        return None  # Avoid ZeroDivisionError
    return a / b

# TIP: WHEN TO USE:
# - int: Counting, indexing, exact values
# - float: Scientific calculations (watch precision)
# - Decimal: Money, exact decimal representation
# - Fraction: Exact rational numbers`,
        },
      ],
    },
    {
      id: "data-structures-performance",
      title: "Data Structures & Performance",
      description:
        "Choose right structure for the job • Understand time complexity • Memory-efficient patterns • Performance trade-offs",
      examples: [
        {
          title: "Lists vs Generators vs Sets - Performance Guide",
          description:
            "Lists: random access needed • Generators: memory efficiency • Sets: fast membership testing • Choose based on use case",
          language: "python",
          code: `from typing import Iterator, List, Set
import sys

# PERFORMANCE: Choose the right data structure

# RECOMMENDED: Lists: Use when you need indexing and small datasets
users = ["alice", "bob", "charlie"]
first_user = users[0]  # O(1) access
users.append("diana")  # O(1) average

# RECOMMENDED: Generators: Use for large datasets or streaming data
def process_large_file(filename: str) -> Iterator[str]:
    """Memory efficient - processes one line at a time."""
    with open(filename) as f:
        for line in f:  # Memory efficient - one line at a time
            yield line.strip().upper()

# Generator expressions for transformations
large_numbers = (x**2 for x in range(1000000))  # No memory until needed

# RECOMMENDED: Sets: Use for membership testing and unique values
valid_usernames = {"alice", "bob", "charlie", "diana"}
if username in valid_usernames:  # O(1) lookup vs O(n) for lists
    print("Valid user")

# 🔍 MEMORY COMPARISON:
# List comprehension: [x**2 for x in range(10000)]  # ~400KB memory
# Generator: (x**2 for x in range(10000))           # ~200 bytes

# RECOMMENDED: Set comprehensions for filtering duplicates
unique_words = {word.lower() for word in text.split()}

# TIP: WHEN TO USE:
# - Lists: Need indexing, small data, multiple iterations
# - Generators: Large data, one-time iteration, memory constrained
# - Sets: Membership testing, removing duplicates, math operations`,
        },
        {
          title: "Dictionary Patterns & Safe Operations",
          description:
            "Use .get() for optional keys • defaultdict for auto-creation • Validate external keys • Avoid KeyError exceptions",
          language: "python",
          code: `from collections import defaultdict, Counter
from typing import Dict, Any, List

# SECURITY: SAFE dictionary operations
user_data = {"name": "Alice", "age": 30}

# RECOMMENDED: Safe access with defaults - prevents KeyError
email = user_data.get("email", "no-email@example.com")
age = user_data.get("age", 0)

# RECOMMENDED: Check before deletion
if "temp_data" in user_data:
    del user_data["temp_data"]

# RECOMMENDED: setdefault for conditional creation
user_data.setdefault("login_count", 0)
user_data["login_count"] += 1

# PERFORMANCE: dict comprehensions vs loops
birth_data = {"alice": 1990, "bob": 1985, "charlie": 1995}

# RECOMMENDED: Fast dictionary creation O(n)
user_ages = {name: 2025 - birth_year
             for name, birth_year in birth_data.items()
             if birth_year > 1990}

# AVOID: Slower loop approach
# user_ages = {}
# for name, birth_year in birth_data.items():
#     if birth_year > 1990:
#         user_ages[name] = 2025 - birth_year

# RECOMMENDED: defaultdict prevents KeyError
user_scores = defaultdict(int)  # Default to 0
user_scores["alice"] += 10  # No KeyError possible

# SECURITY: Validate dictionary keys from external sources
def safe_update_user(user_id: int, updates: Dict[str, Any]) -> bool:
    """Only allow safe field updates."""
    allowed_fields = {"name", "email", "phone"}

    # Only allow safe field updates
    safe_updates = {k: v for k, v in updates.items()
                   if k in allowed_fields and isinstance(v, str)}

    if len(safe_updates) != len(updates):
        return False  # Rejected unsafe fields

    # Proceed with safe updates...
    return True

# TIP: WHEN TO USE:
# - .get(): When key might not exist
# - defaultdict: When you need default values for missing keys
# - Counter: For frequency counting (much faster than manual)`,
        },
      ],
    },
    {
      id: "control-flow-patterns",
      title: "Control Flow & Logic Patterns",
      description:
        "Strategic conditional logic • Guard clauses • Early returns • Avoid deep nesting",
      examples: [
        {
          title: "Strategic Conditional Patterns",
          description:
            "Use guard clauses • Early returns • Avoid deep nesting • Clear error handling paths",
          language: "python",
          code: `# RECOMMENDED: Guard clauses - exit early for invalid conditions
def process_user_order(user_id: int, items: List[str]) -> bool:
    # Guard clauses first
    if not user_id or user_id <= 0:
        return False

    if not items:
        return False

    if len(items) > 50:  # Business rule
        return False

    # Main logic here - no deep nesting
    for item in items:
        if not process_item(item):
            return False

    return True

# AVOID: Avoid deep nesting
def bad_validation(user_data: dict) -> bool:
    if "name" in user_data:
        if len(user_data["name"]) > 0:
            if "email" in user_data:
                if "@" in user_data["email"]:
                    return True
    return False

# RECOMMENDED: Better: Flat structure with clear logic
def good_validation(user_data: dict) -> bool:
    if "name" not in user_data:
        return False

    if not user_data["name"].strip():
        return False

    if "email" not in user_data:
        return False

    if "@" not in user_data["email"]:
        return False

    return True

# TIP: WHEN TO USE:
# - Guard clauses: Input validation, precondition checks
# - Early returns: Complex business logic, error handling
# - Flat structure: Better readability and maintainability`,
        },
        {
          title: "Efficient Loops & Iterations",
          description:
            "Choose right iteration method • Avoid creating unnecessary lists • Use enumerate and zip • Break early when possible",
          language: "python",
          code: `from typing import Iterator, Tuple

# PERFORMANCE: Choose the right iteration method

# RECOMMENDED: enumerate() instead of manual indexing
items = ["apple", "banana", "orange"]
for index, item in enumerate(items):
    print(f"{index}: {item}")

# AVOID: Manual indexing (slower and error-prone)
# for i in range(len(items)):
#     print(f"{i}: {items[i]}")

# RECOMMENDED: zip() for parallel iteration
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# RECOMMENDED: Early break for efficiency
def find_user(users: List[dict], target_id: int) -> Optional[dict]:
    for user in users:
        if user.get("id") == target_id:
            return user  # Found it, stop searching
    return None

# RECOMMENDED: any() and all() for boolean checks
numbers = [2, 4, 6, 8, 10]
has_even = any(n % 2 == 0 for n in numbers)  # True, stops at first even
all_even = all(n % 2 == 0 for n in numbers)  # True

# PERFORMANCE: Generator expressions vs list comprehensions
# Use when you only iterate once
even_squares = (x**2 for x in range(1000) if x % 2 == 0)  # Memory efficient
first_few = list(itertools.islice(even_squares, 5))  # Take only what you need

# TIP: PERFORMANCE TIPS:
# - Break early when condition is met
# - Use generators for large datasets
# - Prefer built-in functions (any, all, sum, max, min)
# - Don't create lists just to iterate once`,
        },
      ],
    },
    {
      id: "functions-patterns",
      title: "Function Design & Error Handling",
      description:
        "Robust function design • Pure functions • Proper error handling • Input validation",
      examples: [
        {
          title: "Strategic Function Design",
          description:
            "Pure functions preferred • Avoid mutable defaults • Single responsibility • Clear error handling",
          language: "python",
          code: `from typing import List, Optional, Callable, Union
from functools import wraps
import logging

# RECOMMENDED: Pure function - predictable, testable, no side effects
def calculate_tax(amount: float, rate: float) -> float:
    """Pure function: same inputs always produce same outputs."""
    if amount < 0 or rate < 0:
        raise ValueError("Amount and rate must be non-negative")
    return amount * rate

# AVOID: NEVER use mutable default arguments
def add_item_wrong(item: str, items: List[str] = []) -> List[str]:
    items.append(item)  # AVOID: Modifies shared default list!
    return items

# RECOMMENDED: Correct way with mutable defaults
def add_item(item: str, items: Optional[List[str]] = None) -> List[str]:
    if items is None:
        items = []  # RECOMMENDED: Create new list each time
    items.append(item)
    return items

# RECOMMENDED: Function with comprehensive validation
def divide_safely(a: Union[int, float], b: Union[int, float]) -> Optional[float]:
    """Safely divide two numbers with full error handling."""
    # Type validation
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        logging.error(f"Invalid types for division: {type(a)}, {type(b)}")
        return None

    # Division by zero check
    if b == 0:
        logging.warning(f"Division by zero attempted: {a} / {b}")
        return None

    return float(a) / float(b)

# RECOMMENDED: Decorator for input validation
def validate_positive(func: Callable) -> Callable:
    """Decorator to ensure all numeric arguments are positive."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg < 0:
                raise ValueError(f"Function {func.__name__} requires positive numbers")
        return func(*args, **kwargs)
    return wrapper

@validate_positive
def calculate_square_root(number: float) -> float:
    return number ** 0.5

# TIP: WHEN TO USE:
# - Pure functions: Calculations, transformations, business logic
# - Validation decorators: Repeated input validation patterns
# - Optional returns: When operation might fail legitimately`,
        },
        {
          title: "Exception Handling Best Practices",
          description:
            "Specific exceptions • Fail fast • Log errors • Clean up resources • Never silent failures",
          language: "python",
          code: `import logging
from contextlib import contextmanager
from typing import Generator

# RECOMMENDED: Specific exception handling - catch what you can handle
def parse_user_age(age_str: str) -> int:
    """Parse age with comprehensive error handling."""
    try:
        age = int(age_str.strip())
        if not 0 <= age <= 150:
            raise ValueError(f"Age {age} is not in valid range (0-150)")
        return age
    except ValueError as e:
        logging.error(f"Invalid age input '{age_str}': {e}")
        raise  # Re-raise with context - don't silently fail

# RECOMMENDED: Custom exceptions for domain logic
class UserNotFoundError(Exception):
    """Raised when user doesn't exist in system."""
    pass

class InsufficientPermissionsError(Exception):
    """Raised when user lacks required permissions."""
    pass

class ValidationError(Exception):
    """Raised when input validation fails."""
    pass

def get_user_profile(user_id: int, requester_id: int) -> dict:
    """Get user profile with proper error handling."""
    # Input validation
    if user_id <= 0:
        raise ValidationError(f"Invalid user ID: {user_id}")

    # Business logic with specific exceptions
    user = find_user(user_id)
    if not user:
        raise UserNotFoundError(f"User {user_id} not found")

    if not can_access_profile(requester_id, user_id):
        raise InsufficientPermissionsError(
            f"User {requester_id} cannot access profile {user_id}"
        )

    return user

# RECOMMENDED: Resource management with context managers
@contextmanager
def database_transaction() -> Generator[Any, None, None]:
    """Safe database transaction with automatic rollback."""
    conn = get_database_connection()
    trans = conn.begin()
    try:
        yield conn
        trans.commit()
        logging.info("Transaction committed successfully")
    except Exception as e:
        trans.rollback()
        logging.error(f"Transaction rolled back: {e}")
        raise  # Re-raise to caller
    finally:
        conn.close()

# Usage
def update_user_safely(user_id: int, data: dict) -> bool:
    try:
        with database_transaction() as conn:
            conn.execute("UPDATE users SET ... WHERE id = ?", (user_id,))
        return True
    except Exception as e:
        logging.error(f"Failed to update user {user_id}: {e}")
        return False

# TIP: ERROR HANDLING STRATEGY:
# - Specific exceptions: Catch only what you can handle
# - Custom exceptions: Domain-specific error types
# - Context managers: Automatic resource cleanup
# - Logging: Always log errors with context
# - Re-raising: Don't swallow exceptions unless you handle them`,
        },
      ],
    },
    {
      id: "file-io-security",
      title: "File I/O & Data Security",
      description:
        "Safe file operations • Validate paths • Handle encoding • Limit file sizes • Atomic operations",
      examples: [
        {
          title: "Secure File Operations",
          description:
            "Always validate file paths • Check permissions • Handle encoding • Limit file sizes • Use atomic writes",
          language: "python",
          code: `import os
import json
import tempfile
from pathlib import Path
from typing import Optional, Dict, Any
import logging

# RECOMMENDED: Safe file reading with comprehensive validation
def read_config_file(filepath: str, max_size_mb: int = 10) -> Optional[Dict[str, Any]]:
    """Safely read config file with security checks."""
    try:
        path = Path(filepath)

        # SECURITY: Security: Validate file path
        if not path.exists():
            logging.error(f"Config file not found: {filepath}")
            return None

        # SECURITY: Security: Check file size to prevent DoS
        if path.stat().st_size > max_size_mb * 1024 * 1024:
            logging.error(f"Config file too large: {filepath}")
            return None

        # SECURITY: Security: Ensure it's a file, not directory
        if not path.is_file():
            logging.error(f"Path is not a file: {filepath}")
            return None

        # SECURITY: Security: Check read permissions
        if not os.access(path, os.R_OK):
            logging.error(f"No read permission: {filepath}")
            return None

        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)

    except (json.JSONDecodeError, PermissionError, OSError) as e:
        logging.error(f"Failed to read config {filepath}: {e}")
        return None

# RECOMMENDED: Safe file writing with atomic operations
def save_user_data(user_id: int, data: Dict[str, Any], data_dir: str = "/safe/data") -> bool:
    """Atomically save user data to prevent corruption."""
    # SECURITY: Validate user_id to prevent path injection
    if not isinstance(user_id, int) or user_id <= 0:
        logging.error(f"Invalid user_id: {user_id}")
        return False

    filepath = Path(data_dir) / f"user_{user_id}.json"

    try:
        # Create directory if it doesn't exist
        filepath.parent.mkdir(parents=True, exist_ok=True)

        # RECOMMENDED: Write to temporary file first (atomic operation)
        with tempfile.NamedTemporaryFile(
            mode='w',
            suffix='.tmp',
            dir=filepath.parent,
            delete=False,
            encoding='utf-8'
        ) as temp_file:
            json.dump(data, temp_file, indent=2, ensure_ascii=False)
            temp_filepath = temp_file.name

        # RECOMMENDED: Atomic rename (prevents corruption)
        os.rename(temp_filepath, filepath)
        logging.info(f"User data saved: {user_id}")
        return True

    except (OSError, json.JSONEncodeError) as e:
        logging.error(f"Failed to save user data {user_id}: {e}")
        # Clean up temp file if it exists
        if 'temp_filepath' in locals() and os.path.exists(temp_filepath):
            os.remove(temp_filepath)
        return False

# SECURITY: Safe file path validation
def validate_file_path(user_path: str, allowed_dir: str) -> Optional[Path]:
    """Validate file path to prevent directory traversal attacks."""
    try:
        # Resolve all symbolic links and relative paths
        allowed = Path(allowed_dir).resolve()
        target = (allowed / user_path).resolve()

        # Ensure target is within allowed directory
        if not str(target).startswith(str(allowed)):
            logging.warning(f"Path traversal attempt: {user_path}")
            return None

        return target

    except (OSError, ValueError) as e:
        logging.error(f"Invalid path: {user_path} - {e}")
        return None

# TIP: SECURITY BEST PRACTICES:
# - Always validate file paths for directory traversal
# - Check file sizes to prevent DoS attacks
# - Use atomic writes to prevent corruption
# - Handle encoding explicitly (UTF-8 recommended)
# - Log security violations for monitoring`,
        },
        {
          title: "CSV & Data Processing - Memory Efficient",
          description:
            "Process large files efficiently • Validate data • Handle malformed records • Use pandas for complex operations",
          language: "python",
          code: `import csv
import pandas as pd
from typing import Generator, List, Dict, Any, Iterator
import logging

# RECOMMENDED: Memory-efficient CSV processing for large files
def process_large_csv(filepath: str) -> Generator[Dict[str, str], None, None]:
    """Process CSV file line by line to avoid memory issues."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)

            for row_num, row in enumerate(reader, 1):
                # Validate each row before yielding
                if validate_csv_row(row):
                    yield {k: v.strip() for k, v in row.items() if v}  # Clean data
                else:
                    logging.warning(f"Invalid row {row_num} in {filepath}: {row}")

    except (FileNotFoundError, PermissionError, UnicodeDecodeError) as e:
        logging.error(f"Cannot read CSV {filepath}: {e}")

def validate_csv_row(row: Dict[str, str]) -> bool:
    """Validate required fields and data quality."""
    required_fields = {'user_id', 'name', 'email'}

    # Check required fields exist and are not empty
    if not required_fields.issubset(row.keys()):
        return False

    if not all(row.get(field, '').strip() for field in required_fields):
        return False

    # Basic email validation
    email = row.get('email', '')
    if '@' not in email or len(email) < 5:
        return False

    # Validate user_id is numeric
    try:
        int(row.get('user_id', ''))
    except ValueError:
        return False

    return True

# RECOMMENDED: For large datasets, use pandas with chunking
def process_large_dataset(filepath: str, chunk_size: int = 10000) -> Iterator[pd.DataFrame]:
    """Process large CSV in chunks to manage memory."""
    try:
        chunk_iter = pd.read_csv(
            filepath,
            chunksize=chunk_size,
            dtype={'user_id': 'Int64'},  # Nullable integer
            parse_dates=['created_date'] if 'created_date' else None
        )

        for chunk_num, chunk in enumerate(chunk_iter):
            # Data cleaning and validation
            chunk = chunk.dropna(subset=['user_id', 'name'])  # Remove incomplete records
            chunk = chunk[chunk['email'].str.contains('@', na=False)]  # Basic email filter

            if not chunk.empty:
                logging.info(f"Processed chunk {chunk_num}: {len(chunk)} valid records")
                yield chunk

    except Exception as e:
        logging.error(f"Failed to process dataset {filepath}: {e}")

# RECOMMENDED: Safe CSV writing with validation
def write_csv_safely(data: List[Dict[str, Any]], filepath: str) -> bool:
    """Write CSV with error handling and data validation."""
    if not data:
        logging.warning("No data to write")
        return False

    try:
        # Get fieldnames from first record
        fieldnames = list(data[0].keys())

        with open(filepath, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()

            for row_num, row in enumerate(data, 1):
                try:
                    # Validate each row before writing
                    cleaned_row = {k: str(v) if v is not None else '' for k, v in row.items()}
                    writer.writerow(cleaned_row)
                except Exception as e:
                    logging.error(f"Failed to write row {row_num}: {e}")
                    continue

        logging.info(f"Successfully wrote {len(data)} records to {filepath}")
        return True

    except Exception as e:
        logging.error(f"Failed to write CSV {filepath}: {e}")
        return False

# TIP: WHEN TO USE:
# - Generators: Files larger than available RAM
# - Pandas chunks: Complex data analysis on large datasets
# - Validation: All external data sources
# - CSV module: Simple, fast processing for smaller files`,
        },
        {
          title: "JSON Operations - Safe & Efficient",
          description:
            "Handle JSON securely • Validate data types • Handle large files • Custom serialization",
          language: "python",
          code: `import json
from typing import Any, Dict, Optional
from datetime import datetime
import logging

# RECOMMENDED: Safe JSON reading with validation
def read_json_safely(filepath: str, max_size_mb: int = 100) -> Optional[Dict[str, Any]]:
    """Read JSON file with size and content validation."""
    try:
        # Check file size first
        file_size = os.path.getsize(filepath)
        if file_size > max_size_mb * 1024 * 1024:
            logging.error(f"JSON file too large: {file_size} bytes")
            return None

        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Validate it's a dictionary (not a list or primitive)
        if not isinstance(data, dict):
            logging.warning(f"Expected dict, got {type(data)}")

        return data

    except json.JSONDecodeError as e:
        logging.error(f"Invalid JSON in {filepath}: {e}")
        return None
    except Exception as e:
        logging.error(f"Failed to read JSON {filepath}: {e}")
        return None

# RECOMMENDED: Safe JSON writing with custom encoder
class SafeJSONEncoder(json.JSONEncoder):
    """Custom JSON encoder for common Python types."""
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, set):
            return list(obj)
        elif hasattr(obj, '__dict__'):  # Custom objects
            return obj.__dict__
        return super().default(obj)

def write_json_safely(data: Any, filepath: str) -> bool:
    """Write JSON with error handling and pretty formatting."""
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(
                data,
                f,
                cls=SafeJSONEncoder,
                indent=2,
                ensure_ascii=False,  # Allow Unicode characters
                sort_keys=True       # Consistent ordering
            )

        logging.info(f"JSON written successfully: {filepath}")
        return True

    except (TypeError, ValueError, OSError) as e:
        logging.error(f"Failed to write JSON {filepath}: {e}")
        return False

# SECURITY: Secure JSON parsing for external APIs
def parse_api_response(json_text: str, expected_fields: set) -> Optional[Dict[str, Any]]:
    """Parse JSON from external API with validation."""
    try:
        # Parse JSON
        data = json.loads(json_text)

        # Validate structure
        if not isinstance(data, dict):
            logging.error("API response is not a JSON object")
            return None

        # Check for required fields
        missing_fields = expected_fields - set(data.keys())
        if missing_fields:
            logging.error(f"Missing required fields: {missing_fields}")
            return None

        return data

    except json.JSONDecodeError as e:
        logging.error(f"Invalid JSON from API: {e}")
        return None

# RECOMMENDED: Streaming JSON for large files
def stream_json_array(filepath: str) -> Generator[Dict[str, Any], None, None]:
    """Stream large JSON arrays without loading entire file."""
    import ijson  # pip install ijson

    try:
        with open(filepath, 'rb') as f:
            # Parse each object in the array
            for obj in ijson.items(f, 'item'):
                if isinstance(obj, dict):
                    yield obj

    except Exception as e:
        logging.error(f"Failed to stream JSON {filepath}: {e}")

# TIP: JSON BEST PRACTICES:
# - Always validate structure of external JSON
# - Use custom encoders for Python-specific types
# - Check file sizes before loading
# - Stream large JSON files instead of loading entirely
# - Handle encoding explicitly (UTF-8 recommended)`,
        },
      ],
    },
    {
      id: "performance-optimization",
      title: "Performance & Memory Optimization",
      description:
        "Write efficient code • Profile before optimizing • Memory-aware patterns • Algorithm selection",
      examples: [
        {
          title: "Memory-Efficient Patterns",
          description:
            "Use generators for large data • Profile memory usage • Avoid creating unnecessary objects • Monitor resource usage",
          language: "python",
          code: `import sys
import itertools
from typing import Iterator, List
import logging

# PERFORMANCE: MEMORY: Generator vs List comparison
def read_large_file_inefficient(filepath: str) -> List[str]:
    """AVOID: Loads entire file into memory - can cause MemoryError."""
    with open(filepath) as f:
        return [line.strip().upper() for line in f]  # All lines in memory

def read_large_file_efficient(filepath: str) -> Iterator[str]:
    """RECOMMENDED: Processes one line at a time - constant memory usage."""
    with open(filepath) as f:
        for line in f:
            yield line.strip().upper()  # One line at a time

# PERFORMANCE: STRING: Efficient string concatenation
def build_report_slow(items: List[str]) -> str:
    """AVOID: Slow: O(n²) time complexity due to string immutability."""
    result = ""
    for item in items:
        result += f"Item: {item}\\n"  # Creates new string each time
    return result

def build_report_fast(items: List[str]) -> str:
    """RECOMMENDED: Fast: O(n) time complexity using join."""
    return "\\n".join(f"Item: {item}" for item in items)

# 🔍 Memory monitoring decorator
def monitor_memory(func):
    """Decorator to monitor function memory usage."""
    def wrapper(*args, **kwargs):
        import tracemalloc
        tracemalloc.start()

        result = func(*args, **kwargs)

        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()

        logging.info(f"{func.__name__} memory: {current / 1024 / 1024:.2f} MB "
                    f"(peak: {peak / 1024 / 1024:.2f} MB)")
        return result
    return wrapper

@monitor_memory
def process_data(data: List[int]) -> List[int]:
    return [x * 2 for x in data if x > 0]

# PERFORMANCE: ITERATION: Efficient data processing patterns
def process_large_numbers_efficient(max_num: int) -> Iterator[int]:
    """Use generator to process large sequences efficiently."""
    for i in range(max_num):
        if i % 2 == 0:
            yield i ** 2

# Use itertools for efficient iteration patterns
def batch_process(items: List[Any], batch_size: int) -> Iterator[List[Any]]:
    """Process items in batches to control memory usage."""
    it = iter(items)
    while True:
        batch = list(itertools.islice(it, batch_size))
        if not batch:
            break
        yield batch

# TIP: MEMORY OPTIMIZATION STRATEGIES:
# - Use generators for one-time iteration
# - Join strings instead of concatenating
# - Process data in batches for large datasets
# - Monitor memory usage in production
# - Choose appropriate data structures for use case`,
        },
        {
          title: "Algorithm Optimization & Performance",
          description:
            "Choose right algorithms • Understand time complexity • Use built-in functions • Profile bottlenecks",
          language: "python",
          code: `import bisect
from collections import defaultdict, Counter, deque
import heapq
from typing import List, Dict, Set, Tuple
import time

# PERFORMANCE: MEMBERSHIP: Fast membership testing
def find_common_users_slow(list1: List[str], list2: List[str]) -> List[str]:
    """AVOID: O(n*m) time complexity - avoid for large lists."""
    common = []
    for user in list1:
        if user in list2:  # O(m) lookup in list
            common.append(user)
    return common

def find_common_users_fast(list1: List[str], list2: List[str]) -> Set[str]:
    """RECOMMENDED: O(n+m) time complexity using set intersection."""
    return set(list1) & set(list2)  # Much faster for large datasets

# PERFORMANCE: COUNTING: Efficient frequency analysis
def count_words_slow(text: str) -> Dict[str, int]:
    """AVOID: Manual counting - slower and more error-prone."""
    word_count = {}
    for word in text.split():
        word_count[word] = word_count.get(word, 0) + 1
    return word_count

def count_words_fast(text: str) -> Counter:
    """RECOMMENDED: Use Counter for frequency counting."""
    return Counter(text.split())  # Optimized C implementation

# PERFORMANCE: SEARCH: Binary search for sorted data
def find_score_range(scores: List[int], min_score: int, max_score: int) -> List[int]:
    """Efficiently find scores in range using binary search O(log n)."""
    if not scores:
        return []

    # Binary search requires sorted data
    start_idx = bisect.bisect_left(scores, min_score)
    end_idx = bisect.bisect_right(scores, max_score)
    return scores[start_idx:end_idx]

# PERFORMANCE: TOP-K: Heap for top-K problems
def get_top_k_scores(scores: List[int], k: int) -> List[int]:
    """Efficiently get top K scores: O(n log k) vs O(n log n) for full sort."""
    if k >= len(scores):
        return sorted(scores, reverse=True)
    return heapq.nlargest(k, scores)

def get_bottom_k_scores(scores: List[int], k: int) -> List[int]:
    """Get bottom K scores efficiently."""
    return heapq.nsmallest(k, scores)

# PERFORMANCE: GROUPING: Efficient data grouping
def group_users_by_department(users: List[Dict[str, str]]) -> Dict[str, List[str]]:
    """Group users efficiently using defaultdict."""
    groups = defaultdict(list)
    for user in users:
        groups[user['department']].append(user['name'])
    return dict(groups)

# PERFORMANCE: DEQUE: Efficient queue operations
def process_queue_efficient(tasks: List[str]) -> None:
    """Use deque for efficient queue operations O(1) vs O(n) for list."""
    task_queue = deque(tasks)

    while task_queue:
        current_task = task_queue.popleft()  # O(1) vs list.pop(0) which is O(n)

        # Process task...
        if should_retry(current_task):
            task_queue.append(current_task)  # Add back to end

# 🔍 Performance measurement decorator
def time_it(func):
    """Decorator to measure function execution time."""
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()

        logging.info(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@time_it
def performance_critical_function(data: List[int]) -> int:
    return sum(x for x in data if x > 0)

# TIP: PERFORMANCE GUIDELINES:
# - Profile before optimizing (measure, don't guess)
# - Use set for membership testing (O(1) vs O(n))
# - Use Counter for frequency counting
# - Use heapq for top-K problems
# - Use deque for queue operations
# - Use bisect for sorted data searches
# - Choose right data structure for the use case`,
        },
      ],
    },
    {
      id: "testing-debugging",
      title: "Testing & Debugging Best Practices",
      description:
        "Write testable code • Debug effectively • Handle edge cases • Use proper assertions",
      examples: [
        {
          title: "Strategic Testing Patterns",
          description:
            "Test edge cases • Use proper assertions • Mock external dependencies • Test error conditions",
          language: "python",
          code: `import unittest
from unittest.mock import patch, Mock
import pytest
from typing import List, Optional

# RECOMMENDED: Testable function design
def calculate_user_score(user_actions: List[str], bonus_multiplier: float = 1.0) -> int:
    """Calculate user score with clear inputs and outputs."""
    if not user_actions:
        return 0

    if bonus_multiplier < 0:
        raise ValueError("Bonus multiplier cannot be negative")

    base_score = len(user_actions) * 10
    return int(base_score * bonus_multiplier)

# RECOMMENDED: Comprehensive test cases
class TestUserScore(unittest.TestCase):
    """Test all edge cases and error conditions."""

    def test_empty_actions(self):
        """Test edge case: empty input."""
        result = calculate_user_score([])
        self.assertEqual(result, 0)

    def test_normal_case(self):
        """Test typical usage."""
        actions = ["login", "view_page", "purchase"]
        result = calculate_user_score(actions)
        self.assertEqual(result, 30)  # 3 actions * 10 points

    def test_with_bonus(self):
        """Test bonus multiplier."""
        actions = ["login", "purchase"]
        result = calculate_user_score(actions, bonus_multiplier=1.5)
        self.assertEqual(result, 30)  # 2 * 10 * 1.5 = 30

    def test_negative_multiplier_raises_error(self):
        """Test error condition."""
        with self.assertRaises(ValueError):
            calculate_user_score(["action"], bonus_multiplier=-1.0)

    def test_zero_multiplier(self):
        """Test edge case: zero multiplier."""
        result = calculate_user_score(["action"], bonus_multiplier=0)
        self.assertEqual(result, 0)

# RECOMMENDED: Mocking external dependencies
def get_user_data(user_id: int) -> Optional[dict]:
    """Function that calls external API."""
    import requests
    response = requests.get(f"https://api.example.com/users/{user_id}")
    if response.status_code == 200:
        return response.json()
    return None

class TestUserData(unittest.TestCase):
    """Test external API calls with mocking."""

    @patch('requests.get')
    def test_successful_api_call(self, mock_get):
        """Mock successful API response."""
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"id": 123, "name": "Alice"}
        mock_get.return_value = mock_response

        result = get_user_data(123)
        self.assertEqual(result, {"id": 123, "name": "Alice"})
        mock_get.assert_called_once_with("https://api.example.com/users/123")

    @patch('requests.get')
    def test_api_error(self, mock_get):
        """Mock API error response."""
        mock_response = Mock()
        mock_response.status_code = 404
        mock_get.return_value = mock_response

        result = get_user_data(999)
        self.assertIsNone(result)

# TIP: TESTING BEST PRACTICES:
# - Test edge cases (empty, null, boundary values)
# - Test error conditions and exceptions
# - Use mocks for external dependencies
# - Write tests before or alongside code
# - Keep tests simple and focused`,
        },
        {
          title: "Debugging & Error Investigation",
          description:
            "Use proper logging • Debug systematically • Handle edge cases • Use debugging tools effectively",
          language: "python",
          code: `import logging
import traceback
import pdb
from typing import Any, Dict
import sys

# RECOMMENDED: Comprehensive logging setup
def setup_logging():
    """Configure logging for debugging and production."""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('app.log'),
            logging.StreamHandler(sys.stdout)
        ]
    )

# RECOMMENDED: Debugging with proper error context
def process_user_order(order_data: Dict[str, Any]) -> bool:
    """Process order with comprehensive error handling and logging."""
    logger = logging.getLogger(__name__)

    try:
        # Log input for debugging
        logger.info(f"Processing order: {order_data.get('order_id', 'unknown')}")

        # Validate input
        if not order_data:
            logger.error("Empty order data received")
            return False

        required_fields = ['user_id', 'items', 'total']
        missing_fields = [field for field in required_fields if field not in order_data]

        if missing_fields:
            logger.error(f"Missing required fields: {missing_fields}")
            return False

        # Process order steps with logging
        user_id = order_data['user_id']
        logger.debug(f"Validating user {user_id}")

        if not validate_user(user_id):
            logger.warning(f"Invalid user: {user_id}")
            return False

        # More processing...
        logger.info(f"Order processed successfully: {order_data['order_id']}")
        return True

    except Exception as e:
        # Log full traceback for debugging
        logger.error(f"Order processing failed: {str(e)}")
        logger.error(traceback.format_exc())
        return False

# RECOMMENDED: Debug decorator for function tracing
def debug_trace(func):
    """Decorator to trace function calls and returns."""
    def wrapper(*args, **kwargs):
        logger = logging.getLogger(func.__module__)
        logger.debug(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")

        try:
            result = func(*args, **kwargs)
            logger.debug(f"{func.__name__} returned: {result}")
            return result
        except Exception as e:
            logger.error(f"{func.__name__} raised: {e}")
            raise

    return wrapper

@debug_trace
def calculate_discount(price: float, discount_percent: float) -> float:
    """Calculate discount with debugging trace."""
    if discount_percent < 0 or discount_percent > 100:
        raise ValueError(f"Invalid discount: {discount_percent}%")

    return price * (discount_percent / 100)

# RECOMMENDED: Interactive debugging techniques
def debug_function_with_breakpoint():
    """Example of using debugger breakpoint."""
    data = [1, 2, 3, 4, 5]

    # Set breakpoint for interactive debugging
    # pdb.set_trace()  # Uncomment to activate debugger

    result = sum(x * 2 for x in data)
    return result

# RECOMMENDED: Assertion-based debugging
def validate_user_data(user_data: Dict[str, Any]) -> bool:
    """Use assertions for debugging and validation."""
    # Assertions help catch bugs during development
    assert isinstance(user_data, dict), f"Expected dict, got {type(user_data)}"
    assert 'user_id' in user_data, "Missing user_id field"
    assert isinstance(user_data['user_id'], int), "user_id must be integer"

    # Additional validation...
    return True

# TIP: DEBUGGING STRATEGIES:
# - Use logging levels appropriately (DEBUG, INFO, WARNING, ERROR)
# - Log inputs and outputs for complex functions
# - Use assertions to catch bugs early in development
# - Use pdb.set_trace() for interactive debugging
# - Log full tracebacks for exceptions
# - Include context in error messages (user_id, order_id, etc.)`,
        },
      ],
    },
  ],
};
