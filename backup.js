// Helper function to generate a random string of specific length from the provided character set
// It works by iterating over the length of the string to be generated,
// and for each character, it selects a random character from the provided character set
function randomString(length, chars) {
  let result = "";
  for (let i = 0; i < length; i++)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

// Process the command line arguments
const argv = process.argv.slice(2);

// Define the basic character set and the extended character set
// The basic character set includes all uppercase and lowercase alphabets and digits
// The extended character set includes all printable ASCII characters except control characters
const basicCharacterSet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let passwordCharacterSet = basicCharacterSet;
const extendedCharacterSet = Array.from({ length: 95 }, (_, i) =>
  String.fromCharCode(i + 32)
).join("");

// Set default options for username and password generation
// These defaults can be modified by the command line arguments
let options = {
  count: 10,
  usernameLength: 12,
  passwordLength: 12,
  passwordDuplication: false,
  usernamePrefix: "",
  useExtendedCharacterSet: false,
};

// Parse command line arguments
// If an option is provided in the command line arguments, the corresponding default option is modified
for (let i = 0; i < argv.length; i++) {
  switch (argv[i]) {
    case "-c":
      options.count = parseInt(argv[++i]);
      break;
    case "-ul":
      options.usernameLength = parseInt(argv[++i]);
      break;
    case "-pl":
      options.passwordLength = parseInt(argv[++i]);
      break;
    case "-pd":
      options.passwordDuplication = true;
      options.commonPassword =
        argv[i + 1] && !argv[i + 1].startsWith("-")
          ? argv[++i]
          : randomString(options.passwordLength, passwordCharacterSet);
      break;
    case "-up":
      options.usernamePrefix = argv[++i];
      break;
    case "-e":
      options.useExtendedCharacterSet = true;
      passwordCharacterSet = extendedCharacterSet;
      break;
  }
}

// Generate and print rows of username and password pairs
// If a username prefix is provided, it is added to the start of each username
// Usernames with a prefix have ascending numbers added to the end of the prefix
// If password duplication is true, all passwords will be the same
for (let i = 0; i < options.count; i++) {
  let username = options.usernamePrefix
    ? options.usernamePrefix + (i + 1)
    : randomString(options.usernameLength, basicCharacterSet);
  let password = options.passwordDuplication
    ? options.commonPassword
    : randomString(options.passwordLength, passwordCharacterSet);
  console.log(username + "," + password);
}
