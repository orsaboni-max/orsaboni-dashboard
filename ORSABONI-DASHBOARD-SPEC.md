# @orsaboni Content Command Center — PROJECT SPEC

## מה זה
מערכת ניהול תוכן לאינסטגרם עבור מותג אישי בתחום כושר ותזונה.
5 מסכים, הכל במקום אחד.

## Stack
- **Framework**: Next.js 14+ (App Router) + TypeScript
- **UI**: Tailwind CSS + Shadcn/ui
- **Database**: Supabase (PostgreSQL) — Free Tier
- **Auth**: לא צריך (single user)
- **Deploy**: Vercel
- **APIs**: Windsor.ai, Meta oEmbed, Claude API, PubMed E-utilities

## Design System
- **רקע**: #FAFAF8
- **Surface**: #FFFFFF
- **Border**: #E8E8E0
- **Accent**: #f0734a
- **Font Display**: Playfair Display (כותרות)
- **Font Body**: Heebo (טקסט)
- **Font Numbers**: DM Sans (מספרים)
- **Direction**: RTL
- **Sidebar**: 200px, sticky, ניווט ראשי

---

## 5 מסכים

### מסך 1 — פיד מתחרים
**מטרה**: לראות את הפוסטים והרילס של המתחרים בלי לפתוח אינסטגרם.

**מקור נתונים**: Windsor.ai API (instagram_public connector)
- 13 חשבונות מחוברים: trainbloom, jeffnippard, bryanjohnson_, biolayne, xtinecardenas, ccristina_fit, excelled.health, iradolfin, trainerjye, haroldjrc, orsaboni, shalev_vardi_fitness, stefi.cohen

**פיצ'רים**:
- Grid של כרטיסי מתחרים עם תמונת פרופיל (unavatar.io/instagram/{username})
- לחיצה על מתחרה → נפתחת רשימת הפוסטים האחרונים שלו
- כל פוסט מוטמע עם react-social-media-embed (InstagramEmbed component)
  - npm: react-social-media-embed
  - דוגמה: <InstagramEmbed url="https://www.instagram.com/reel/DVWRSIJjCQq/" width={328} />
- ליד כל פוסט מוטמע: כפתור "◆ צור תוכן מזה" → עובר למסך 3 עם הנתונים
- Windsor fields: media_permalink, media_caption, media_like_count, media_comments_count, media_product_type, media_timestamp
- פילטר לפי מתחרה / נושא / סוג (REELS/FEED/CAROUSEL)
- בורר 7/30/90 ימים

### מסך 2 — לוח תוכן חודשי
**מטרה**: לראות מה עולה מתי, לתזמן תוכן, לראות שעות חזקות.

**פיצ'רים**:
- תצוגת חודש (FullCalendar או custom)
- כל יום מציג פוסטים מתוכננים עם צבע לפי Pillar:
  - 🔵 אימונים
  - 🟢 תזונה
  - 🟠 מחקרים/Myth-busting
  - 🟣 מאחורי הקלעים
  - 🔴 תוספי תזונה
- Drag & drop לשינוי תאריך
- שעות חזקות מסומנות (מהמחקר):
  - 07:00 — בוקר ישראלי
  - 12:30 — צהריים
  - 17:30 — ערב (IDT) — חלון גלובלי מושלם
  - 21:30 — ערב US
- לחיצה על יום ריק → פותח טופס יצירת תוכן חדש (מסך 3)
- לחיצה על פוסט קיים → פותח אותו לעריכה

**מקור נתונים**: Supabase table `posts`
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  caption TEXT,
  script TEXT,
  pillar TEXT CHECK (pillar IN ('training','nutrition','research','bts','supplements')),
  format TEXT CHECK (format IN ('reel','carousel','feed','story')),
  status TEXT CHECK (status IN ('idea','draft','approved','scheduled','published')) DEFAULT 'idea',
  scheduled_date DATE,
  scheduled_time TIME,
  citations JSONB DEFAULT '[]',
  instagram_url TEXT,
  likes INTEGER,
  comments INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### מסך 3 — יצירת תוכן
**מטרה**: לכתוב סקריפט עם Claude, לאמת מדעית, לאשר.

**פיצ'רים**:
1. **בחירת נושא** — חופשי או מתוך פוסט מתחרה (מגיע ממסך 1)
2. **Claude כותב סקריפט** — כפתור "צור סקריפט"
   - API call to Claude (Sonnet 4.5/4.6)
   - System prompt כולל voice-dna-orsaboni + orsaboni-instagram skill rules
   - Output format: Hook → גוף → CTA → Caption → Hashtags → הנחיות צילום
3. **עורך טקסט** — Tiptap v2 rich text editor, RTL, עברית
   - עריכה חופשית של הסקריפט
4. **אימות מדעי** — כפתור "🔬 אמת טענה"
   - מסמן טקסט → לוחץ אמת → PubMed E-utilities search
   - מציג תוצאות עם PMID, כותרת, journal
   - לוחץ "צרף" → PMID נוסף ל-citations array
5. **כלל ברזל** — banner קבוע:
   - ✓ לא להעתיק טענות מהמתחרה
   - ✓ כל טענה חייבת PMID
   - ✓ ערכים תזונתיים מבינה
   - ✓ ניסוח בקול של אור
6. **אישור** — כפתור "מוכן ✅" → סטטוס משתנה ל-approved → עובר למסך 2 לתזמון

**Claude API Integration**:
```
POST /api/generate-script
Body: { topic, inspiration_post, pillar, format }
→ Backend calls Claude API:
  POST https://api.anthropic.com/v1/messages
  Headers: x-api-key, anthropic-version: 2023-06-01
  Body: { model: "claude-sonnet-4-20250514", max_tokens: 2000, system: VOICE_DNA_PROMPT, messages }
→ Stream response back via SSE
```

**PubMed Integration**:
```
POST /api/verify-claim
Body: { claim_text }
→ Backend calls:
  1. ESearch: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term={claim}+AND+systematic+review[pt]&retmax=5&retmode=json
  2. ESummary: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id={ids}&retmode=json
→ Returns: [{ pmid, title, authors, journal, year }]
```

### מסך 4 — הכנה לעלייה (Kanban)
**מטרה**: לראות בבט אחד מה בתהליך, מה מוכן, מה עלה.

**פיצ'רים**:
- 5 עמודות: רעיון → טיוטה → מאושר → מתוזמן → פורסם
- כל כרטיס מציג: כותרת, Pillar צבעוני, פורמט, תאריך מתוכנן, מספר citations
- Drag & drop בין עמודות (dnd-kit)
- לחיצה על כרטיס → פותח את מסך 3 לעריכה
- סינון לפי Pillar / פורמט / תאריך

### מסך 5 — ניתוח מתחרים
**מטרה**: תובנות שבועיות — מי המתחרים, מה עובד, Content Gaps.

**פיצ'רים** (כבר קיים בדאשבורד V4):
- כרטיסי מתחרים עם תמונות פרופיל
- דירוג לפי ER
- מיקס תוכן (Reels vs Feed)
- Content Pillars analysis
- Content Gap Finder
- תבניות שעובדות
- כלל ברזל

---

## Windsor.ai API Reference
- Connector: instagram_public
- Accounts: trainbloom, jeffnippard, bryanjohnson_, biolayne, xtinecardenas, ccristina_fit, excelled.health, iradolfin, trainerjye, haroldjrc, orsaboni, shalev_vardi_fitness, stefi.cohen
- Key fields: profile_username, profile_followers_count, profile_media_count, media_caption, media_like_count, media_comments_count, media_type, media_product_type, media_timestamp, media_permalink, media_thumbnail_url, biography

## File Structure
```
orsaboni-dashboard/
├── app/
│   ├── layout.tsx          # RTL, fonts, sidebar
│   ├── page.tsx            # Redirect to /feed
│   ├── feed/page.tsx       # מסך 1 — פיד מתחרים
│   ├── calendar/page.tsx   # מסך 2 — לוח תוכן
│   ├── create/page.tsx     # מסך 3 — יצירת תוכן
│   ├── kanban/page.tsx     # מסך 4 — הכנה לעלייה
│   ├── analytics/page.tsx  # מסך 5 — ניתוח
│   └── api/
│       ├── windsor/route.ts
│       ├── generate-script/route.ts
│       ├── verify-claim/route.ts
│       └── posts/route.ts
├── components/
│   ├── Sidebar.tsx
│   ├── CompetitorCard.tsx
│   ├── PostEmbed.tsx
│   ├── ContentCalendar.tsx
│   ├── ScriptEditor.tsx
│   ├── KanbanBoard.tsx
│   ├── CitationCard.tsx
│   └── IronRule.tsx
├── lib/
│   ├── windsor.ts
│   ├── claude.ts
│   ├── pubmed.ts
│   └── supabase.ts
├── .env.local
└── PROJECT.md
```

## Environment Variables (.env.local)
```
WINDSOR_API_KEY=           # from windsor.ai dashboard
ANTHROPIC_API_KEY=         # from console.anthropic.com
NEXT_PUBLIC_SUPABASE_URL=  # from supabase dashboard
NEXT_PUBLIC_SUPABASE_ANON_KEY= # from supabase dashboard
```

## שעות פרסום אופטימליות (מהמחקר)
| יום | שעה (ישראל) | סוג תוכן | שפה |
|-----|-------------|----------|------|
| ראשון | 07:00 | טיפ אימון | עברית |
| ראשון | 17:30 | Reel הדגמה | English |
| שלישי | 12:30 | Carousel חינוכי | Bilingual |
| שלישי | 18:00 | Reel מתכון | English |
| רביעי | 07:00 | מוטיבציה | עברית |
| חמישי | 12:30 | Carousel מדע | Bilingual |
| חמישי | 21:30 | Reel engagement | English |
| שישי | 12:00 | BTS | עברית |

## כלל ברזל — אימות מדעי
1. לא להעתיק טענות מהמתחרה — ניסוח מקורי בקול של אור
2. כל טענה חייבת מאמר peer-reviewed עם PMID מ-PubMed
3. ערכים תזונתיים מדויקים מבינה — לא לקחת מהמתחרה
4. פורמט בהשראה — תוכן מקורי 100%
