# Exemplar papers, as text

Plain text of the four exemplar systems in `data/`. The PDFs stay local: they are anonymous
submissions, and `data/` is in `.gitignore`.

| File | System | Pages in the PDF |
|---|---|---|
| `halo.txt` | HALO | 20 |
| `happier.txt` | HAPPIER | 27 |
| `perspectevolver.txt` | PerspectEvolver | 31 |
| `theseus.txt` | THESEUS | 43 |

Made with `pdftotext`, then lines that hold only a number are removed, because the submission
line numbers land between the sentences. Three or more blank lines become one.

Regenerate one file:

```bash
pdftotext data/<name>.pdf - | python3 -c "
import sys, re
lines = [l for l in sys.stdin.read().splitlines() if not re.fullmatch(r'\s*\d{1,4}\s*', l)]
sys.stdout.write(re.sub(r'\n{3,}', '\n\n', '\n'.join(lines)).strip() + '\n')
" > data-text/<name>.txt
```

Limits of the text: it holds no figure, and a table loses its columns. The § numbers in
`pattern-language/refs/exemplar-systems-review.md` point into the PDF, and the section headings
here carry the same numbers.
