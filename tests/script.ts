import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(
  "https://api.devnet.solana.com",
  "confirmed",
);

const user = new PublicKey(
  "6KpVFh4ehrWZoWNaNWWsd4MitZ9axhybgS6CXdNiUP1V",
);

const registrationProgram = new PublicKey(
  "TRBZyQHB3m68FGeVsqTK39Wm4xejadjVhP5MAZaKWDM",
);

const [registrationPda] = PublicKey.findProgramAddressSync(
  [Buffer.from("prereqs"), user.toBuffer()],
  registrationProgram,
);

async function main() {
  console.log("Registration PDA:", registrationPda.toBase58());

  const account = await connection.getAccountInfo(registrationPda);

  if (!account) {
    console.log("Registration account does not exist.");
    return;
  }

  console.log("Registration account exists.");
  console.log("Owner:", account.owner.toBase58());
  console.log("Data (hex):", account.data.toString("hex"));
}

main().catch(console.error);