# Generate accounts (user,password pairs) as CSV

Node.js script to generate random username and password pairs. Suitable for example for radperf and similar RADIUS server testing. It is highly customizable and uses command line arguments to fine tune the output.

## Options:

- `-c`: The count of rows to be generated (default is 10).
- `-ul`: The length of usernames to be generated (default is 12).
- `-pl`: The length of passwords to be generated (default is 12).
- `-up`: A prefix for usernames. If this option is set followed by a non-option argument, this argument will be used as a prefix for usernames, and the usernames will be this prefix followed by a sequential number.
- `-pd`: A flag to enable password duplication. If this flag is set, all generated passwords will be the same. If followed by a non-option argument (not starting with `-`), this argument will be used as the common password.
- `-e`: A flag to enable extended character set for passwords. If this flag is set, all printable ASCII characters will be used for password generation.

## Usage:

To run this script, use the command: 

```bash
node genAccountsCSV.js [options] > accounts.csv
```

Replace `[options]` with your desired options and use `> accounts.csv` if you need to write the output to a file.

## Examples:

Generate 15 rows of random usernames and passwords with username length 10 and password length 8:

```bash
node genAccountsCSV.js -c 15 -ul 10 -pl 8
```

Generate 10 rows (default count) of random usernames with "user" prefix and the same password "password123":

```bash
node genAccountsCSV.js -up "miniradius" -pd "pass123"
```

Generate 20 rows of random usernames and passwords using the extended character set:

```bash
node genAccountsCSV.js -c 20 -e
```
