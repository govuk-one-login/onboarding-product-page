import fs from "fs/promises";

async function loadEmails(): Promise<string[]> {
    let data;
    try {
        data = fs.readFile('./valid-email-domains.txt', {
                encoding: 'utf8'
            }
        )
    } catch (error) {
        console.error("List of valid email domains could not be loaded.");
        console.error(error);
        process.kill(process.pid, 'SIGTERM');
    }
    return (await data as string).split('\n');
}

export default loadEmails();

// try {
//     const data = await fs.readFIle(...)
//     return data.split("/n);
// } catch(err) {
//
// }
//
//fs.readFile("./t") as string