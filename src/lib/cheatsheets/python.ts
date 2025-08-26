import { CheatSheet } from "@/types/cheatsheet";

export const pythonCheatSheet: CheatSheet = {
  title: "Python Cheat Sheet",
  description: "Essential Python programming reference with practical examples",
  sections: [
    {
      id: "basics",
      title: "Python Basics",
      description: "Variables, data types, and basic operations",
      examples: [
        {
          title: "Variables and Data Types",
          description: "Python's core data types and variable assignment",
          language: "python",
          code: `# Variables and basic data types
name = "Python"
age = 30
price = 99.99
is_active = True

# Multiple assignment
x, y, z = 1, 2, 3

# Type checking
print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>
print(type(price))   # <class 'float'>
print(type(is_active))  # <class 'bool'>

# String operations
greeting = f"Hello, {name}!"
text = "Python Programming"
print(text.upper())      # PYTHON PROGRAMMING
print(text.lower())      # python programming
print(text.split())      # ['Python', 'Programming']
print(len(text))         # 18`,
        },
        {
          title: "Numbers and Math",
          description: "Numeric operations and math functions",
          language: "python",
          code: `import math

# Basic arithmetic
x = 10
y = 3

print(x + y)    # 13 (addition)
print(x - y)    # 7 (subtraction)
print(x * y)    # 30 (multiplication)
print(x / y)    # 3.333... (division)
print(x // y)   # 3 (floor division)
print(x % y)    # 1 (modulo)
print(x ** y)   # 1000 (exponentiation)

# Math functions
print(abs(-5))          # 5
print(round(3.7))       # 4
print(math.ceil(3.2))   # 4
print(math.floor(3.8))  # 3
print(math.sqrt(16))    # 4.0
print(math.pow(2, 3))   # 8.0`,
        },
      ],
    },
    {
      id: "control-flow",
      title: "Control Flow",
      description: "Conditional statements and loops",
      examples: [
        {
          title: "If Statements",
          description: "Conditional logic and branching",
          language: "python",
          code: `# Basic if-elif-else
age = 18

if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")

# Comparison operators
x = 10
y = 20

print(x == y)   # False (equal)
print(x != y)   # True (not equal)
print(x < y)    # True (less than)
print(x > y)    # False (greater than)
print(x <= y)   # True (less than or equal)
print(x >= y)   # False (greater than or equal)

# Logical operators
print(x > 5 and y < 30)  # True
print(x > 15 or y > 15)  # True
print(not x > 15)        # True

# Ternary operator
status = "adult" if age >= 18 else "minor"`,
        },
        {
          title: "Loops",
          description: "For and while loops with examples",
          language: "python",
          code: `# For loops
numbers = [1, 2, 3, 4, 5]

# Iterate over list
for num in numbers:
    print(num)

# Range function
for i in range(5):        # 0 to 4
    print(i)

for i in range(1, 6):     # 1 to 5
    print(i)

for i in range(0, 10, 2): # 0, 2, 4, 6, 8
    print(i)

# Enumerate for index and value
fruits = ["apple", "banana", "orange"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# While loops
count = 0
while count < 5:
    print(count)
    count += 1

# Loop control
for i in range(10):
    if i == 3:
        continue  # Skip this iteration
    if i == 7:
        break     # Exit the loop
    print(i)`,
        },
      ],
    },
    {
      id: "data-structures",
      title: "Data Structures",
      description: "Lists, dictionaries, sets, and tuples",
      examples: [
        {
          title: "Lists",
          description: "Working with Python lists",
          language: "python",
          code: `# Creating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# List operations
fruits.append("grape")        # Add to end
fruits.insert(1, "kiwi")      # Insert at index
fruits.remove("banana")       # Remove first occurrence
popped = fruits.pop()         # Remove and return last item
fruits.extend(["mango", "pear"])  # Add multiple items

# List indexing and slicing
print(fruits[0])        # First item: apple
print(fruits[-1])       # Last item: pear
print(fruits[1:3])      # Slice: ['kiwi', 'orange']
print(fruits[:2])       # First two: ['apple', 'kiwi']
print(fruits[2:])       # From index 2 to end

# List comprehensions
squares = [x**2 for x in range(10)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]
words = ["hello", "world", "python"]
lengths = [len(word) for word in words]

# Common list methods
print(len(fruits))           # Length
print(fruits.count("apple")) # Count occurrences
fruits.sort()                # Sort in place
fruits.reverse()             # Reverse in place`,
        },
        {
          title: "Dictionaries",
          description: "Key-value pairs and dictionary operations",
          language: "python",
          code: `# Creating dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Alternative creation methods
person2 = dict(name="Bob", age=25, city="London")
person3 = dict([("name", "Charlie"), ("age", 35)])

# Dictionary operations
person["email"] = "alice@email.com"  # Add new key
person["age"] = 31                   # Update existing key
del person["city"]                   # Delete key
email = person.pop("email", "N/A")   # Remove and return with default

# Dictionary methods
print(person.keys())      # dict_keys(['name', 'age'])
print(person.values())    # dict_values(['Alice', 31])
print(person.items())     # dict_items([('name', 'Alice'), ('age', 31)])

# Safe access
age = person.get("age", 0)           # Returns 0 if key doesn't exist
name = person.setdefault("name", "Unknown")  # Set if key doesn't exist

# Dictionary comprehensions
squares_dict = {x: x**2 for x in range(5)}
filtered_dict = {k: v for k, v in person.items() if isinstance(v, str)}

# Iterating dictionaries
for key in person:
    print(f"{key}: {person[key]}")

for key, value in person.items():
    print(f"{key}: {value}")`,
        },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      description: "Function definitions, parameters, and advanced concepts",
      examples: [
        {
          title: "Basic Functions",
          description: "Function definition and calling",
          language: "python",
          code: `# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameters
def greet_with_title(name, title="Mr/Ms"):
    return f"Hello, {title} {name}!"

# Function with multiple parameters
def calculate_area(length, width):
    return length * width

# Function with variable arguments
def sum_all(*args):
    return sum(args)

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Using functions
message = greet("Alice")
area = calculate_area(10, 5)
total = sum_all(1, 2, 3, 4, 5)
print_info(name="Bob", age=30, city="Paris")

# Lambda functions (anonymous functions)
square = lambda x: x ** 2
add = lambda x, y: x + y

# Using lambda with built-in functions
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))

# Function annotations (type hints)
def add_numbers(x: int, y: int) -> int:
    return x + y`,
        },
        {
          title: "Advanced Functions",
          description: "Decorators, generators, and scope",
          language: "python",
          code: `# Decorators
def timer_decorator(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer_decorator
def slow_function():
    import time
    time.sleep(1)
    return "Done"

# Generators
def fibonacci_generator(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Using generator
fib_numbers = list(fibonacci_generator(10))

# Generator expressions
squares_gen = (x**2 for x in range(10))
even_squares = (x**2 for x in range(10) if x % 2 == 0)

# Scope examples
global_var = "I'm global"

def outer_function():
    outer_var = "I'm in outer"

    def inner_function():
        nonlocal outer_var
        outer_var = "Modified by inner"
        local_var = "I'm local"
        print(f"Local: {local_var}")
        print(f"Outer: {outer_var}")
        print(f"Global: {global_var}")

    inner_function()
    print(f"Outer after inner: {outer_var}")

outer_function()`,
        },
      ],
    },
    {
      id: "file-io",
      title: "File I/O",
      description: "Reading and writing files",
      examples: [
        {
          title: "File Operations",
          description: "Basic file reading and writing",
          language: "python",
          code: `# Writing to a file
with open("example.txt", "w") as file:
    file.write("Hello, World!\\n")
    file.write("This is a second line.\\n")

# Reading from a file
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# Reading line by line
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())  # strip() removes newline characters

# Reading all lines into a list
with open("example.txt", "r") as file:
    lines = file.readlines()

# Appending to a file
with open("example.txt", "a") as file:
    file.write("This line is appended.\\n")

# Working with CSV files
import csv

# Writing CSV
data = [
    ["Name", "Age", "City"],
    ["Alice", 30, "New York"],
    ["Bob", 25, "London"]
]

with open("people.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)

# Reading CSV
with open("people.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)

# CSV with DictReader/DictWriter
with open("people.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"Name: {row['Name']}, Age: {row['Age']}")`,
        },
        {
          title: "JSON Operations",
          description: "Working with JSON data",
          language: "python",
          code: `import json

# Python data structures
data = {
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "JavaScript", "SQL"],
    "is_active": True
}

# Writing JSON to file
with open("data.json", "w") as file:
    json.dump(data, file, indent=2)

# Reading JSON from file
with open("data.json", "r") as file:
    loaded_data = json.load(file)
    print(loaded_data)

# Converting to/from JSON strings
json_string = json.dumps(data, indent=2)
parsed_data = json.loads(json_string)

# Pretty printing JSON
print(json.dumps(data, indent=2, sort_keys=True))

# Handling JSON with custom objects
from datetime import datetime

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

data_with_date = {
    "event": "Meeting",
    "date": datetime.now()
}

json_with_date = json.dumps(data_with_date, cls=DateTimeEncoder)`,
        },
      ],
    },
    {
      id: "error-handling",
      title: "Error Handling",
      description: "Exception handling and debugging",
      examples: [
        {
          title: "Try-Except Blocks",
          description: "Handling exceptions gracefully",
          language: "python",
          code: `# Basic try-except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Multiple exception types
try:
    num = int(input("Enter a number: "))
    result = 10 / num
    print(f"Result: {result}")
except ValueError:
    print("Please enter a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catching multiple exceptions
try:
    # Some risky operation
    pass
except (ValueError, TypeError, ZeroDivisionError) as e:
    print(f"An error occurred: {e}")

# Generic exception handling
try:
    # Some operation
    pass
except Exception as e:
    print(f"Unexpected error: {e}")

# Try-except-else-finally
try:
    file = open("data.txt", "r")
    data = file.read()
except FileNotFoundError:
    print("File not found!")
else:
    print("File read successfully!")
    print(data)
finally:
    if 'file' in locals():
        file.close()
    print("Cleanup completed")

# Raising custom exceptions
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return True

try:
    validate_age(-5)
except ValueError as e:
    print(f"Validation error: {e}")`,
        },
      ],
    },
  ],
};
