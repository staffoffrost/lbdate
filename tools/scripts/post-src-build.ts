

export default async function main(): Promise<void> {
  let arg = process.argv[3]
  if (arg) arg = arg.substr(2)
  const doInclementVersion = !!arg
}
