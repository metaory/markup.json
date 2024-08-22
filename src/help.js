export const ansi = new Proxy(
  { f: 3, b: 4 },
  {
    get:
      (t, [m, c]) =>
      (...a) => {
        process.stdout.write(`\x1b[${t[m] || 3}${c}m`)
        process.stdout.write(a.join(' '))
        process.stdout.write('\x1b[0m\n')
      },
  }
)

export function usage() {
  ansi.f4('\n', 'read input and output path from args')
  ansi.f3('\t', 'markup [FILE] [FILE]')
  ansi.f6('\t', 'markup tpl.json index.html')

  ansi.f4('\n', 'read input path from args')
  ansi.f4('', 'write output to standard output')
  ansi.f3('\t', 'markup [FILE]')
  ansi.f6('\t', 'markup tpl.json')
  ansi.f2('\t', 'markup tpl.json > index.html')

  ansi.f4('\n', 'read input from standard input')
  ansi.f4('', 'write output to standard output')
  ansi.f3('\t', 'cat FILE | markup')
  ansi.f6('\t', 'cat tpl.json | markup')
  ansi.f2('\t', 'cat tpl.json | markup > index.html')

  ansi.f4('\n', 'read from file descriptor')
  ansi.f4('', 'write output to standard output')
  ansi.f3('\t', 'markup < FILE')
  ansi.f6('\t', 'markup < tpl.json')
  ansi.f2('\t', 'markup < tpl.json > index.html', '\n')
}
