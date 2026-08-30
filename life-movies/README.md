# Everything Films

Wedding movies and life movies from what you already have.

**Send pictures. Send videos. Send everything.**

| Package | Runtime | Price |
|---------|---------|-------|
| Featurette | 30 minutes | $10,000 |
| Feature | 60 minutes | $15,000 |

## Live paths

Once published to GitHub Pages:

| Page | URL |
|------|-----|
| Site | `https://turneratom.github.io/VitalAI-PWA/life-movies/` |
| Outreach desk | `https://turneratom.github.io/VitalAI-PWA/life-movies/outreach/` |

## Outreach engine

`/life-movies/outreach/` monitors and emails:

1. **Wedding planners** — partner emails to refer couples for wedding movies
2. **Funeral parlors** — partner emails to offer life movies to families
3. **Wedding announcements** — journey email when a wedding is announced
4. **Birth announcements** — journey email after a 14-day cooling window
5. **Obituaries** — soft journey email after a 7-day cooling window

### Auto-send

The **Auto-send queue** drafts every ready partner + announcement email, opens the next one in your mail client, marks it sent, and advances. Import more leads with the sample CSV:

`data/announcements.sample.csv`

Columns: `kind, headline, subjectName, contactName, email, city, state, publishedOn, eventOn, source, snippet, funeralHome`

Sample partner emails use `.example` addresses — swap in real lists before sending.

## Contact

brad@treadcompanies.com
