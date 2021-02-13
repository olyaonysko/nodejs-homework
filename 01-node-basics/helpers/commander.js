import commander from "commander";
const { Command } = commander;
const program = new Command();

export default program
  .version("0.0.1")
  .option("-l, --list", "Contacts list")
  .option("-g, --get <id>", "Get contact")
  .option("-d, --delete <id>", "Delete contact")
  .option("-a, --add", "Add contact")
  .option("-n, --name <name>", "Enter name")
  .option("-e, --email <email>", "Enter email")
  .option("-p, --phone <phone>", "Enter phone");
