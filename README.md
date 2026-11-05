# Patrick Cruz portfolio

Source for [aerythox.github.io](https://aerythox.github.io/), the portfolio of a backend and security developer. The site is hosted on GitHub Pages.

## How it is built

The site uses plain HTML, CSS, and JavaScript, with no framework or build step.

| File | Purpose |
|---|---|
| `index.html` | All page content |
| `style.css` | Design tokens, layout, and responsive rules |
| `script.js` | Mobile menu, request demo, and active navigation link |
| `404.html` | Page shown for addresses that do not exist |
| `assets/fonts/` | Self-hosted IBM Plex fonts, with their license in `OFL.txt` |
| `assets/img/` | Portrait and social preview image |
| `resume.pdf` | Downloadable résumé |

## Security choices

- **No third-party requests:** fonts and icons are served from this site, and there are no trackers or analytics.
- **Content Security Policy:** set with a `meta` tag, which allows only resources from this site and blocks inline scripts and styles.
- **No contact form:** contact is by email link, so visitor data is not sent to another service.

GitHub Pages does not allow custom response headers, so this site cannot set HSTS, `X-Content-Type-Options`, or a header-based CSP. The `frame-ancestors` directive is also ignored when set in a `meta` tag, so the policy does not prevent framing.

## Preview locally

Serve the folder with any static file server, for example:

```
python -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000`. Opening `index.html` directly from disk may not load everything, because the security policy expects a normal web address.

## Credits

IBM Plex is licensed under the SIL Open Font License 1.1.
