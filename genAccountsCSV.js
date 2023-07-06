// Helper function to generate a random string of specific length from the provided character set
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
const basicCharacterSet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let passwordCharacterSet = basicCharacterSet;
const extendedCharacterSet = Array.from({ length: 95 }, (_, i) =>
  String.fromCharCode(i + 32)
)
  .filter((c) => c !== "," && c !== ";" && c !== " ")
  .join(""); // removes comma, semicolon, and space

// Set default options for username and password generation
let options = {
  count: 10,
  usernameLength: 12,
  passwordLength: 30,
  passwordDuplication: false,
  usernamePrefix: "",
  useExtendedCharacterSet: false,
};

// Parse command line arguments
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

// If no command line arguments are provided, print the help message
if (argv.length === 0) {
  console.log("gen.AccountsCSV.js");
  console.log("");
  console.log("Description:");
  console.log("\tGenerate accounts (user,password pairs) as CSV");
  console.log("");
  console.log("Usage:");
  console.log("\tTo run this script, use the command:");
  console.log("");
  console.log("\t\tnode genAccountsCSV.js [options] > accounts.csv");
  console.log("");
  console.log(
    "\tReplace [options] with your desired options and use > accounts.csv if you need to write the output to a file."
  );
  console.log("");
  console.log("Options:");
  console.log("\t-c\tThe count of rows to be generated (default is 10).");
  console.log(
    "\t-ul\tThe length of usernames to be generated (default is 12)."
  );
  console.log(
    "\t-pl\tThe length of passwords to be generated (default is 12)."
  );
  console.log(
    "\t-up\tA prefix for usernames. If this option is set followed by a non-option argument, this argument will be used as a prefix"
  );
  console.log(
    "\t\tfor usernames, and the usernames will be this prefix followed by a sequential number."
  );
  console.log(
    "\t-pd\tA flag to enable password duplication. If this flag is set, all generated passwords will be the same. If followed by a"
  );
  console.log(
    "\t\tnon-option argument (not starting with -), this argument will be used as the common password."
  );
  console.log(
    "\t-e\tA flag to enable extended character set for passwords. If this flag is set, all printable ASCII characters will"
  );
  console.log(
    "\t\tbe used for password generation excluding comma, semicolon, and space."
  );
  console.log("");
  console.log("Examples:");
  console.log("\tnode genAccountsCSV.js -c 15 -ul 10 -pl 25");
  console.log(
    "\t\tGenerate 15 rows of random usernames and passwords with username length 10 and password length 25."
  );
  console.log("");
  console.log("\tnode genAccountsCSV.js -up 'user' -pd 'pass123'");
  console.log(
    "\t\tGenerate 10 rows (default count) of random usernames with 'user' prefix and the same password 'password123'."
  );
  console.log("");
  console.log("\tnode genAccountsCSV.js -c 20 -e");
  console.log(
    "\t\tGenerate 20 rows of random usernames and passwords using the extended character set excluding comma, semicolon, and space."
  );
} else {
  // Generate and print rows of username and password pairs
  for (let i = 0; i < options.count; i++) {
    let username = options.usernamePrefix
      ? options.usernamePrefix + (i + 1)
      : randomString(options.usernameLength, basicCharacterSet);
    let password = options.passwordDuplication
      ? options.commonPassword
      : randomString(options.passwordLength, passwordCharacterSet);
    console.log(username + "," + password);
  }
}
