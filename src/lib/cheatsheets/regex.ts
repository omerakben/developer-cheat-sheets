import { CheatSheet } from "@/types/cheatsheet";

export const regexCheatSheet: CheatSheet = {
  title: "Regular Expressions (Regex)",
  description:
    "Master regex patterns for text matching, validation, and extraction. From basics to advanced lookaheads, with real-world examples.",
  metadata: {
    lastUpdated: "2025-01-01",
    version: "1.0.0",
    author: "Developer CheatSheets",
  },
  sections: [
    {
      id: "basics",
      title: "Regex Basics",
      description: "Fundamental regex syntax and basic patterns",
      examples: [
        {
          title: "Literal Characters & Special Characters",
          description: "Match exact characters and escape special ones.",
          code: `# Literal match - matches exact text
/hello/          → Matches "hello"
/cat/            → Matches "cat"

# Special characters (need escaping with \\)
. ^ $ * + ? { } [ ] \\ | ( )

# Escape special characters
/\\./            → Matches literal dot "."
/\\*/            → Matches literal asterisk "*"
/\\$/            → Matches literal dollar "$"
/\\[\\]/         → Matches literal brackets "[]"

# Examples:
/example\\.com/  → Matches "example.com"
/price\\$10/     → Matches "price$10"
/\\(123\\)/      → Matches "(123)"

# Case sensitivity
/hello/          → Matches "hello" (case-sensitive)
/hello/i         → Matches "hello", "Hello", "HELLO" (case-insensitive)`,
          language: "regex",
          difficulty: "beginner",
          tags: ["basics", "literals", "escaping"],
        },
        {
          title: "Character Classes",
          description: "Match any character from a set of characters.",
          code: `# Basic character classes
[abc]           → Matches "a", "b", or "c"
[a-z]           → Matches any lowercase letter
[A-Z]           → Matches any uppercase letter
[0-9]           → Matches any digit
[a-zA-Z]        → Matches any letter
[a-zA-Z0-9]     → Matches any letter or digit

# Negated character class
[^abc]          → Matches anything EXCEPT "a", "b", or "c"
[^0-9]          → Matches anything EXCEPT digits

# Predefined character classes
.               → Matches any character except newline
\\d              → Matches any digit [0-9]
\\D              → Matches any non-digit [^0-9]
\\w              → Matches word character [a-zA-Z0-9_]
\\W              → Matches non-word character [^a-zA-Z0-9_]
\\s              → Matches whitespace (space, tab, newline)
\\S              → Matches non-whitespace

# Examples:
/[aeiou]/       → Matches any vowel
/[^aeiou]/      → Matches any consonant
/\\d{3}/         → Matches exactly 3 digits like "123"
/\\w+/           → Matches one or more word characters`,
          language: "regex",
          difficulty: "beginner",
          tags: ["character-classes", "basics", "patterns"],
        },
        {
          title: "Quantifiers",
          description: "Specify how many times a pattern should match.",
          code: `# Basic quantifiers
*               → 0 or more times
+               → 1 or more times
?               → 0 or 1 time (optional)
{n}             → Exactly n times
{n,}            → n or more times
{n,m}           → Between n and m times

# Examples:
/a*/            → "", "a", "aa", "aaa" (0 or more)
/a+/            → "a", "aa", "aaa" (1 or more)
/a?/            → "", "a" (optional)
/a{3}/          → "aaa" (exactly 3)
/a{2,}/         → "aa", "aaa", "aaaa" (2 or more)
/a{2,4}/        → "aa", "aaa", "aaaa" (2 to 4)

# Real-world examples:
/\\d{3}-\\d{3}-\\d{4}/     → Phone: "555-123-4567"
/\\w+@\\w+\\.\\w+/          → Email: "user@domain.com"
/https?:\\/\\//             → "http://" or "https://"
/colou?r/                 → "color" or "colour"

# Greedy vs Lazy
/a.*b/          → Greedy: matches longest possible (default)
/a.*?b/         → Lazy: matches shortest possible
/<.*>/          → "<div>text</div>" matches entire string
/<.*?>/         → "<div>text</div>" matches "<div>" only`,
          language: "regex",
          difficulty: "intermediate",
          tags: ["quantifiers", "repetition", "greedy-lazy"],
        },
      ],
    },
    {
      id: "anchors",
      title: "Anchors & Boundaries",
      description: "Match positions rather than characters",
      examples: [
        {
          title: "Position Anchors",
          description: "Match at specific positions in the string.",
          code: `# Start and end anchors
^               → Start of string/line
$               → End of string/line

# Examples:
/^hello/        → Matches "hello" only at start
/world$/        → Matches "world" only at end
/^hello$/       → Matches exactly "hello" (whole string)
/^\\d+$/         → Matches string containing only digits

# Multiline mode
/^hello/m       → Matches "hello" at start of ANY line
/world$/m       → Matches "world" at end of ANY line

# Word boundaries
\\b              → Word boundary
\\B              → Non-word boundary

# Examples:
/\\bcat\\b/       → Matches "cat" in "the cat sat"
                  → Does NOT match "cat" in "catfish" or "tomcat"
/\\Bcat\\B/       → Matches "cat" in "location"
                  → Does NOT match standalone "cat"

# Real-world examples:
/^[A-Z]/        → Starts with capital letter
/!$/            → Ends with exclamation mark
/^\\s*$/         → Empty line or whitespace only
/\\b\\d{3}\\b/    → 3-digit number as whole word`,
          language: "regex",
          difficulty: "intermediate",
          tags: ["anchors", "boundaries", "position"],
        },
      ],
    },
    {
      id: "groups",
      title: "Groups & Capturing",
      description: "Group patterns and capture matched text",
      examples: [
        {
          title: "Capturing Groups",
          description: "Capture parts of a match for later use.",
          code: `# Basic capturing group
(pattern)       → Captures matched text

# Examples:
/(\\d{3})-(\\d{3})-(\\d{4})/
                → Captures phone parts: "555-123-4567"
                  Group 1: "555"
                  Group 2: "123"
                  Group 3: "4567"

/([a-z]+)@([a-z]+)\\.([a-z]+)/
                → Captures email parts: "user@example.com"
                  Group 1: "user"
                  Group 2: "example"
                  Group 3: "com"

# JavaScript usage:
const regex = /(\\d{4})-(\\d{2})-(\\d{2})/;
const match = "2024-01-15".match(regex);
// match[0]: "2024-01-15" (full match)
// match[1]: "2024" (year)
// match[2]: "01" (month)
// match[3]: "15" (day)

# Named capturing groups (more readable)
/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/

const match = "2024-01-15".match(regex);
// match.groups.year: "2024"
// match.groups.month: "01"
// match.groups.day: "15"

# Backreferences (reference captured groups)
/(\\w+)\\s+\\1/   → Matches repeated words: "hello hello"
/<(\\w+)>.*?<\\/\\1>/ → Matches HTML tags: "<div></div>"

# Non-capturing group (don't capture)
(?:pattern)     → Groups but doesn't capture

/(\\d{3})-(?:\\d{3})-(\\d{4})/
                → Only captures 1st and 3rd group`,
          language: "regex",
          difficulty: "intermediate",
          tags: ["groups", "capturing", "backreferences"],
        },
      ],
    },
    {
      id: "lookaround",
      title: "Lookahead & Lookbehind",
      description: "Match based on what comes before or after",
      examples: [
        {
          title: "Lookahead Assertions",
          description: "Match only if followed by specific pattern (doesn't consume).",
          code: `# Positive lookahead
(?=pattern)     → Match if followed by pattern

# Examples:
/\\d+(?= dollars)/    → Matches "42" in "42 dollars"
                      → Doesn't match "42" in "42 euros"

/password(?=.*\\d)/   → Requires digit somewhere after "password"

# Negative lookahead
(?!pattern)     → Match if NOT followed by pattern

# Examples:
/\\d+(?! dollars)/    → Matches "42" in "42 euros"
                      → Doesn't match "42" in "42 dollars"

/^(?!.*admin)/        → String that doesn't contain "admin"

# Real-world: Password validation
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/
  (?=.*[a-z])         → At least one lowercase
  (?=.*[A-Z])         → At least one uppercase
  (?=.*\\d)            → At least one digit
  (?=.*[@$!%*?&])     → At least one special char
  [A-Za-z\\d@$!%*?&]{8,} → Min 8 characters`,
          language: "regex",
          difficulty: "advanced",
          tags: ["lookahead", "assertions", "advanced"],
        },
        {
          title: "Lookbehind Assertions",
          description: "Match only if preceded by specific pattern.",
          code: `# Positive lookbehind
(?<=pattern)    → Match if preceded by pattern

# Examples:
/(?<=\\$)\\d+/        → Matches "42" in "$42"
                    → Doesn't match "42" in "€42"

/(?<=@)\\w+/         → Matches "example" in "@example"

# Negative lookbehind
(?<!pattern)    → Match if NOT preceded by pattern

# Examples:
/(?<!\\$)\\d+/        → Matches "42" in "€42"
                    → Doesn't match "42" in "$42"

# Real-world examples:
/(?<=price: \\$)\\d+\\.\\d{2}/
                    → Matches "19.99" in "price: $19.99"

/(?<!un)happy/      → Matches "happy" but not "unhappy"

/(?<=\\d{3}-)\\d{3}-\\d{4}/
                    → Matches last 7 digits of phone after area code

# Note: Not all regex engines support lookbehind
# JavaScript: Supported in modern browsers (ES2018+)
# Python: Supported in re module`,
          language: "regex",
          difficulty: "advanced",
          tags: ["lookbehind", "assertions", "advanced"],
        },
      ],
    },
    {
      id: "common-patterns",
      title: "Common Patterns",
      description: "Ready-to-use regex for everyday tasks",
      examples: [
        {
          title: "Email Validation",
          description: "Validate email addresses with different levels of strictness.",
          code: `# Simple email (basic validation)
/^[\\w.-]+@[\\w.-]+\\.\\w+$/

# More strict email
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/

# Comprehensive email (RFC 5322 simplified)
/^[a-zA-Z0-9.!#$%&'*+\\/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

# JavaScript usage:
function isValidEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

// Examples:
isValidEmail("user@example.com")     // true
isValidEmail("user.name@domain.co")  // true
isValidEmail("invalid.email")        // false
isValidEmail("@example.com")         // false`,
          language: "regex",
          difficulty: "intermediate",
          tags: ["email", "validation", "common"],
          documentationUrl: "https://www.regular-expressions.info/email.html",
        },
        {
          title: "URL/URI Patterns",
          description: "Match and validate URLs and URIs.",
          code: `# Simple URL
/https?:\\/\\/[\\w.-]+(:\\d+)?(\\/[^\\s]*)?/

# URL with optional protocol
/(https?:\\/\\/)?(www\\.)?[\\w.-]+\\.[a-z]{2,}(\\/[^\\s]*)?/

# Complete URL validation
/^(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&\\/\\/=]*)$/

# Extract parts:
/^(https?):\\/\\/([^\\/]+)(\\/?.*)?$/
Group 1: protocol (http/https)
Group 2: domain
Group 3: path

# Examples:
const url = "https://example.com:8080/path?query=value";
const regex = /^(https?):\\/\\/([^:\\/]+)(?::(\\d+))?(\\/.*)$/;
const match = url.match(regex);
// match[1]: "https"
// match[2]: "example.com"
// match[3]: "8080"
// match[4]: "/path?query=value"

# JavaScript helper:
function extractURL(url) {
  const regex = /^(https?):\\/\\/([^:\\/]+)(?::(\\d+))?(\\/.*)?$/;
  const match = url.match(regex);
  if (!match) return null;

  return {
    protocol: match[1],
    domain: match[2],
    port: match[3] || (match[1] === 'https' ? '443' : '80'),
    path: match[4] || '/'
  };
}`,
          language: "regex",
          difficulty: "intermediate",
          tags: ["url", "validation", "common"],
        },
        {
          title: "Phone Numbers",
          description: "Match various phone number formats.",
          code: `# US Phone Numbers
/^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/

# Matches:
// "555-123-4567"
// "(555) 123-4567"
// "555.123.4567"
// "5551234567"

# International format
/^\\+?[1-9]\\d{1,14}$/

# With country code
/^\\+\\d{1,3}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$/

# Extract phone parts:
/^\\(?(\\d{3})\\)?[-.\\s]?(\\d{3})[-.\\s]?(\\d{4})$/

const phone = "(555) 123-4567";
const match = phone.match(regex);
// match[1]: "555" (area code)
// match[2]: "123"
// match[3]: "4567"

# Normalize phone number:
function normalizePhone(phone) {
  return phone.replace(/\\D/g, ''); // Remove non-digits
}

normalizePhone("(555) 123-4567") // "5551234567"`,
          language: "regex",
          difficulty: "intermediate",
          tags: ["phone", "validation", "common"],
        },
        {
          title: "Date & Time Patterns",
          description: "Match and extract dates in various formats.",
          code: `# ISO 8601 date (YYYY-MM-DD)
/^\\d{4}-\\d{2}-\\d{2}$/
/^(\\d{4})-(\\d{2})-(\\d{2})$/  // With capture groups

# US date (MM/DD/YYYY or MM-DD-YYYY)
/^(\\d{1,2})[\\/\\-](\\d{1,2})[\\/\\-](\\d{4})$/

# European date (DD/MM/YYYY)
/^(\\d{1,2})[\\/\\-](\\d{1,2})[\\/\\-](\\d{4})$/

# Time (24-hour format)
/^([01]?\\d|2[0-3]):([0-5]\\d)(?::([0-5]\\d))?$/

# Matches:
// "09:30"
// "14:45"
// "23:59:59"

# DateTime (ISO 8601)
/^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z?$/

# Examples:
"2024-01-15T09:30:00.000Z"
"2024-01-15T14:45:00"

# Extract date parts:
function parseDate(dateStr) {
  const regex = /^(\\d{4})-(\\d{2})-(\\d{2})$/;
  const match = dateStr.match(regex);
  if (!match) return null;

  return {
    year: parseInt(match[1]),
    month: parseInt(match[2]),
    day: parseInt(match[3])
  };
}`,
          language: "regex",
          difficulty: "intermediate",
          tags: ["date", "time", "parsing", "common"],
        },
        {
          title: "Password Validation",
          description: "Enforce password complexity requirements.",
          code: `# Minimum 8 characters, at least one letter and one number
/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/

# Minimum 8 chars, uppercase, lowercase, number, special char
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/

# Explained:
(?=.*[a-z])        → At least one lowercase letter
(?=.*[A-Z])        → At least one uppercase letter
(?=.*\\d)           → At least one digit
(?=.*[@$!%*?&])    → At least one special character
[A-Za-z\\d@$!%*?&]{8,} → Min 8 characters from allowed set

# No spaces allowed
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/

# JavaScript validation:
function validatePassword(password) {
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);

  return {
    valid: minLength && hasUpper && hasLower && hasDigit && hasSpecial,
    minLength,
    hasUpper,
    hasLower,
    hasDigit,
    hasSpecial
  };
}

# Flexible complexity check:
function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\\d/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  if (strength <= 2) return 'weak';
  if (strength <= 4) return 'medium';
  return 'strong';
}`,
          language: "regex",
          difficulty: "intermediate",
          tags: ["password", "validation", "security"],
        },
        {
          title: "HTML Tags & Content",
          description: "Extract or remove HTML tags.",
          code: `# Match any HTML tag
/<[^>]+>/g

# Match specific tag
/<div[^>]*>.*?<\\/div>/gs

# Match opening tag only
/<(\\w+)[^>]*>/

# Match closing tag
/<\\/(\\w+)>/

# Remove all HTML tags (strip HTML)
text.replace(/<[^>]+>/g, '')

# Extract text between tags
/<p>(.*?)<\\/p>/gs

# Match self-closing tags
/<\\w+[^>]*\\/>/

# JavaScript examples:
function stripHTML(html) {
  return html.replace(/<[^>]+>/g, '');
}

stripHTML("<p>Hello <b>world</b></p>")  // "Hello world"

function extractLinks(html) {
  const regex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  const links = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    links.push(match[1]);
  }

  return links;
}

# Extract image sources:
function extractImages(html) {
  const regex = /<img[^>]+src=["']([^"']+)["']/gi;
  const images = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    images.push(match[1]);
  }

  return images;
}`,
          language: "regex",
          difficulty: "advanced",
          tags: ["html", "parsing", "extraction"],
        },
      ],
    },
    {
      id: "practical",
      title: "Practical Applications",
      description: "Real-world regex solutions in JavaScript",
      examples: [
        {
          title: "String Methods with Regex",
          description: "Using regex with JavaScript string methods.",
          code: `// test() - Check if pattern matches
const regex = /hello/i;
regex.test("Hello World")  // true
regex.test("Goodbye")      // false

// match() - Extract matches
const str = "My phone is 555-123-4567";
const phone = str.match(/\\d{3}-\\d{3}-\\d{4}/);
// phone[0]: "555-123-4567"

// matchAll() - Get all matches with groups
const text = "user1@test.com and user2@example.com";
const regex = /([\\w.]+)@([\\w.]+)\\.([a-z]+)/g;
const matches = [...text.matchAll(regex)];
// matches[0][1]: "user1"
// matches[0][2]: "test"
// matches[0][3]: "com"

// replace() - Replace matches
"hello world".replace(/world/, "there")  // "hello there"

// replaceAll() - Replace all matches
"a b c".replaceAll(/\\s/g, "-")  // "a-b-c"

// split() - Split by pattern
"apple,banana;cherry".split(/[,;]/)  // ["apple", "banana", "cherry"]

// search() - Find position of match
"hello world".search(/world/)  // 6
"hello world".search(/bye/)    // -1

// Regex with callback in replace():
const text = "hello WORLD";
const result = text.replace(/\\b\\w/g, (match) => match.toUpperCase());
// result: "Hello WORLD"

// Named groups in replace:
const date = "2024-01-15";
const formatted = date.replace(
  /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/,
  '$<month>/$<day>/$<year>'
);
// formatted: "01/15/2024"`,
          language: "javascript",
          difficulty: "intermediate",
          tags: ["javascript", "methods", "practical"],
        },
        {
          title: "Input Validation Helper",
          description: "Reusable validation functions for common inputs.",
          code: `// Validation utilities
const Validator = {
  email: (email) => {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
  },

  phone: (phone) => {
    const regex = /^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/;
    return regex.test(phone);
  },

  url: (url) => {
    const regex = /^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b/;
    return regex.test(url);
  },

  zipCode: (zip) => {
    const regex = /^\\d{5}(-\\d{4})?$/;  // US ZIP
    return regex.test(zip);
  },

  creditCard: (cc) => {
    const regex = /^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$/;
    return regex.test(cc);
  },

  username: (username) => {
    // 3-20 chars, letters, numbers, underscore, hyphen
    const regex = /^[a-zA-Z0-9_-]{3,20}$/;
    return regex.test(username);
  },

  password: (password) => {
    // Min 8 chars, 1 upper, 1 lower, 1 digit
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/;
    return regex.test(password);
  },

  hexColor: (color) => {
    const regex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return regex.test(color);
  }
};

// Usage:
if (Validator.email("user@example.com")) {
  console.log("Valid email");
}

// Form validation example:
function validateForm(formData) {
  const errors = {};

  if (!Validator.email(formData.email)) {
    errors.email = "Invalid email address";
  }

  if (!Validator.phone(formData.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!Validator.password(formData.password)) {
    errors.password = "Password must be at least 8 characters with uppercase, lowercase, and number";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}`,
          language: "javascript",
          difficulty: "intermediate",
          tags: ["validation", "utilities", "practical"],
        },
      ],
    },
  ],
};
