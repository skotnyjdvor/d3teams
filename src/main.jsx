import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
const API_URL=(import.meta.env.VITE_API_URL||"").replace(/\/$/,"");
const apiUrl=(path)=>`${API_URL}/api${path}`;
import {
  LayoutDashboard,
  Boxes,
  ClipboardCheck,
  CalendarDays,
  Radio,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  MapPin,
  Clock3,
  ChevronRight,
  Menu,
  X,
  Warehouse,
  Truck,
  Upload,
  CircleUserRound,
  SlidersHorizontal,
  PackagePlus,
  ArrowRightLeft,
  AlertTriangle,
  Pencil,
  Trash2,
  History,
  PlusCircle,
  Users,
  UserPlus,
  ShieldCheck,
  Mail,
  UserCheck,
  UserX,
  CheckCircle2,
  Circle,
  Flag,
  Wrench,
  Ban,
  PlayCircle,
  Copy,
  Trophy,
  FlaskConical,
  Dumbbell,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";
import "./styles.css";

const copy = {
  EN: {
    overview: "Overview",
    inventory: "Inventory",
    tasks: "Tasks",
    calendar: "Calendar",
    documents: "Documents",
    reports: "Reports",
    telemetry: "Telemetry",
    members: "Team members",
    team: "Team",
    morning: "Good morning, Tony",
    subtitle: "Here’s what needs your attention today.",
    next: "NEXT EVENT",
    days: "DAYS TO GO",
    readiness: "TEAM READINESS",
    openTasks: "OPEN TASKS",
    stockAlerts: "STOCK ALERTS",
    nextEvent: "Next event",
    viewCalendar: "View calendar",
    readinessTitle: "Race readiness",
    viewChecklist: "Open checklist",
    critical: "Critical",
    today: "Today",
    thisWeek: "This week",
    inventoryTitle: "Inventory overview",
    viewInventory: "View inventory",
    base: "Base",
    truck: "Truck",
    items: "items",
    lowStock: "Low stock",
    activity: "Recent activity",
    allActivity: "View all activity",
    quick: "Quick actions",
    addTask: "Add task",
    moveStock: "Move stock",
    upload: "Upload telemetry",
    nav: "Navigation",
    search: "Search anything…",
    race: "Polish Karting Championship · Round 4",
    track: "Słomczyn Karting Circuit",
    date: "18–20 July 2026",
    mechanic: "Mechanic tasks",
    engine: "Engine service · Kart 07",
    alignment: "Front alignment · Kart 12",
    tyres: "Prepare wet tyre set",
    brake: "Brake pads — CRG",
    chain: "Chains 219",
    oil: "Racing oil 1L",
    assigned: "Assigned to Marek",
    completed: "Completed by Kuba",
    moved: "12 chains moved Base → Truck",
    uploaded: "Telemetry uploaded · Kart 07",
  },
  PL: {
    overview: "Przegląd",
    inventory: "Magazyn",
    tasks: "Zadania",
    calendar: "Kalendarz",
    documents: "Dokumenty",
    reports: "Raporty",
    telemetry: "Telemetria",
    members: "Członkowie zespołu",
    team: "Zespół",
    morning: "Dzień dobry, Tony",
    subtitle: "Oto sprawy, które dziś wymagają uwagi.",
    next: "NAJBLIŻSZE ZAWODY",
    days: "DNI DO STARTU",
    readiness: "GOTOWOŚĆ ZESPOŁU",
    openTasks: "OTWARTE ZADANIA",
    stockAlerts: "BRAKI MAGAZYNOWE",
    nextEvent: "Najbliższe wydarzenie",
    viewCalendar: "Zobacz kalendarz",
    readinessTitle: "Gotowość do zawodów",
    viewChecklist: "Otwórz checklistę",
    critical: "Krytyczne",
    today: "Dzisiaj",
    thisWeek: "W tym tygodniu",
    inventoryTitle: "Stan magazynowy",
    viewInventory: "Otwórz magazyn",
    base: "Baza",
    truck: "Ciężarówka",
    items: "pozycji",
    lowStock: "Niski stan",
    activity: "Ostatnia aktywność",
    allActivity: "Zobacz całą aktywność",
    quick: "Szybkie akcje",
    addTask: "Dodaj zadanie",
    moveStock: "Przenieś części",
    upload: "Wgraj telemetrię",
    nav: "Nawigacja",
    search: "Szukaj…",
    race: "Kartingowe Mistrzostwa Polski · Runda 4",
    track: "Tor Kartingowy Słomczyn",
    date: "18–20 lipca 2026",
    mechanic: "Zadania mechaników",
    engine: "Serwis silnika · Kart 07",
    alignment: "Geometria przodu · Kart 12",
    tyres: "Przygotuj komplet deszczowy",
    brake: "Klocki hamulcowe — CRG",
    chain: "Łańcuchy 219",
    oil: "Olej wyścigowy 1L",
    assigned: "Przypisano do: Marek",
    completed: "Ukończone przez: Kuba",
    moved: "12 łańcuchów przeniesiono Baza → Ciężarówka",
    uploaded: "Wgrano telemetrię · Kart 07",
  },
};

const nav = [
  ["overview", LayoutDashboard],
  ["inventory", Boxes],
  ["tasks", ClipboardCheck],
  ["calendar", CalendarDays],
  ["telemetry", Radio],
  ["members", Users],
];
function Logo() {
  return (
    <div className="logo">
      <div className="logoMark">D3</div>
      <div>
        <strong>D3TEAMS</strong>
        <small>RACE OPERATIONS</small>
      </div>
    </div>
  );
}
function App() {
  const [lang, setLang] = useState("EN");
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("overview");
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("d3session"));
    } catch {
      return null;
    }
  });
  const [dashboard, setDashboard] = useState(null);
  const [dashboardError, setDashboardError] = useState("");
  useEffect(() => {
    if (!session || active !== "overview") return;
    let current = true;
    setDashboardError("");
    fetch(apiUrl("/dashboard"), { headers: { Authorization: `Bearer ${session.token}` } })
      .then(async r => { const data = await r.json(); if (!r.ok) throw Error(data.error); return data; })
      .then(data => current && setDashboard(data))
      .catch(error => current && setDashboardError(error.message));
    return () => { current = false; };
  }, [session, active]);
  const t = copy[lang];
  const inviteToken = new URLSearchParams(window.location.search).get("invite");
  const logout = () => {
    localStorage.removeItem("d3session");
    setSession(null);
  };
  if (!session && inviteToken)
    return <AcceptInvitation token={inviteToken} lang={lang} setLang={setLang} onAccept={(s) => { window.history.replaceState({}, "", window.location.pathname); localStorage.setItem("d3session", JSON.stringify(s)); setSession(s); }} />;
  if (!session)
    return (
      <Login
        lang={lang}
        setLang={setLang}
        onLogin={(s) => {
          localStorage.setItem("d3session", JSON.stringify(s));
          setSession(s);
        }}
      />
    );
  return (
    <div className="app">
      <aside className={menu ? "sidebar open" : "sidebar"}>
        <div className="sideTop">
          <Logo />
          <button className="close" onClick={() => setMenu(false)}>
            <X />
          </button>
        </div>
        <span className="navLabel">{t.nav}</span>
        <nav>
          {nav.map(([k, I]) => (
            <button
              key={k}
              className={active === k ? "active" : ""}
              onClick={() => {
                setActive(k);
                setMenu(false);
              }}
            >
              <I size={19} />
              <span>{t[k]}</span>
            </button>
          ))}
        </nav>
        <div className="teamCard">
          <div className="teamBadge">{(session.team?.name || "T").slice(0,2).toUpperCase()}</div>
          <div>
            <strong>{session.team?.name || (lang === "PL" ? "Twój zespół" : "Your team")}</strong>
            <small>{t.team}{dashboard?.members != null ? ` · ${dashboard.members} members` : ""}</small>
          </div>
          <ChevronRight size={18} />
        </div>
        <div className="user">
          <div className="avatar">
            {session.user.name
              .split(" ")
              .map((x) => x[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <strong>{session.user.name}</strong>
            <small>{session.user.role}</small>
          </div>
          <button onClick={logout} title="Sign out">
            ↪
          </button>
        </div>
      </aside>
      <main>
        <header>
          <button className="menuBtn" onClick={() => setMenu(true)}>
            <Menu />
          </button>
          <div className="mobileLogo">
            <Logo />
          </div>
          <div className="search">
            <Search size={18} />
            <input placeholder={t.search} />
            <kbd>⌘ K</kbd>
          </div>
          <div className="headerActions">
            <div className="lang">
              <button
                className={lang === "EN" ? "selected" : ""}
                onClick={() => setLang("EN")}
              >
                EN
              </button>
              <button
                className={lang === "PL" ? "selected" : ""}
                onClick={() => setLang("PL")}
              >
                PL
              </button>
            </div>
            <button className="iconBtn">
              <Bell size={20} />
              <i />
            </button>
            <button className="mobileUser">
              <CircleUserRound />
            </button>
          </div>
        </header>
        <div className="content">
          {active === "inventory" ? (
            <InventoryView lang={lang} session={session} />
          ) : active === "members" ? (
            <TeamView lang={lang} session={session} />
          ) : active === "tasks" ? (
            <TasksView lang={lang} session={session} />
          ) : active === "calendar" ? (
            <CalendarView lang={lang} session={session} />
          ) : active === "telemetry" ? (
            <TelemetryView lang={lang} />
          ) : (
            <>
              <section className="welcome">
                <div>
                  <p className="eyebrow">D3TEAMS · RACE OPERATIONS</p>
                  <h1>{t.morning}</h1>
                  <p>{t.subtitle}</p>
                </div>
                <button className="primary" onClick={() => setActive("tasks")}>
                  <Plus size={18} />
                  {t.addTask}
                </button>
              </section>
              <section className="metrics">
                <Metric label={t.next} value={dashboard?.nextEvent?.daysUntil ?? 0} suffix={t.days} accent={!!dashboard?.nextEvent} />
                <Metric label={t.readiness} value={dashboard?.readiness ?? 0} suffix="%" progress={dashboard?.readiness ?? 0} />
                <Metric label={t.openTasks} value={dashboard?.tasks?.open ?? 0} suffix={dashboard?.tasks?.critical ? `${dashboard.tasks.critical} CRITICAL` : ""} warn={!!dashboard?.tasks?.critical} />
                <Metric label={t.stockAlerts} value={dashboard?.inventory?.alerts ?? 0} suffix={dashboard?.inventory?.outOfStock ? `${dashboard.inventory.outOfStock} OUT OF STOCK` : ""} warn={!!dashboard?.inventory?.alerts} />
              </section>
              {dashboardError && <div className="apiError">{dashboardError}</div>}
              <section className="grid">
                <div className="column">
                  <Card title={t.nextEvent} action={t.viewCalendar} onAction={() => setActive("calendar")}>
                    {dashboard?.nextEvent ? <div className="event">
                      <div className="dateTile"><b>{new Date(`${dashboard.nextEvent.startDate}T00:00:00`).getDate()}</b><span>{new Date(`${dashboard.nextEvent.startDate}T00:00:00`).toLocaleString(lang === "PL" ? "pl-PL" : "en-GB",{month:"short"}).toUpperCase()}</span></div>
                      <div className="eventInfo"><span className="live">{dashboard.nextEvent.type}</span><h2>{dashboard.nextEvent.title}</h2><p><MapPin size={15}/>{dashboard.nextEvent.track || dashboard.nextEvent.location}</p><p><CalendarDays size={15}/>{dashboard.nextEvent.startDate} — {dashboard.nextEvent.endDate}</p></div>
                      <ChevronRight className="eventArrow"/>
                    </div> : <EmptyOverview icon={CalendarDays} text={lang === "PL" ? "Brak nadchodzących wydarzeń" : "No upcoming events"} />}
                  </Card>
                  <Card title={t.readinessTitle} action={t.viewChecklist} onAction={() => setActive("tasks")}>
                    {dashboard?.nextEvent ? <div className="readiness"><div className="ring" style={{"--p":`${dashboard.readiness}%`}}><div><b>{dashboard.readiness}%</b><span>READY</span></div></div><div className="checks"><Status label={lang === "PL" ? "Zadania wydarzenia" : "Event tasks"} value={`${dashboard.readiness}%`} percent={dashboard.readiness}/></div></div> : <EmptyOverview icon={ClipboardCheck} text={lang === "PL" ? "Brak danych gotowości" : "No readiness data"} />}
                  </Card>
                  <Card title={t.mechanic} action={t.tasks} onAction={() => setActive("tasks")}>
                    {dashboard?.tasks?.items?.length ? <div className="taskList">{dashboard.tasks.items.map((item,index)=><Task key={index} title={item.title} meta={item.assignee || (lang === "PL" ? "Nieprzypisane" : "Unassigned")} tag={item.priority}/>)}</div> : <EmptyOverview icon={ClipboardCheck} text={lang === "PL" ? "Brak zadań mechaników" : "No mechanic tasks"} />}
                  </Card>
                </div>
                <div className="column">
                  <Card
                    title={t.inventoryTitle}
                    action={t.viewInventory}
                    onAction={() => setActive("inventory")}
                  >
                    <div className="locations">
                      <Location
                        icon={Warehouse}
                        name={t.base}
                        count={dashboard?.inventory?.base ?? 0}
                        t={t}
                      />
                      <Location icon={Truck} name={t.truck} count={dashboard?.inventory?.truck ?? 0} t={t} />
                    </div>
                    <div className="stock">
                      {dashboard?.inventory?.lowStock?.length ? dashboard.inventory.lowStock.map((part,index)=><Stock key={index} name={part.name} count={part.count}/>) : <EmptyOverview icon={Boxes} text={lang === "PL" ? "Brak alertów magazynowych" : "No inventory alerts"} />}
                    </div>
                  </Card>
                  <Card title={t.quick}>
                    <div className="quick">
                      <button onClick={() => setActive("tasks")}>
                        <span>
                          <Plus />
                        </span>
                        {t.addTask}
                      </button>
                      <button onClick={() => setActive("inventory")}>
                        <span>
                          <ArrowUpRight />
                        </span>
                        {t.moveStock}
                      </button>
                      <button onClick={() => setActive("telemetry")}>
                        <span>
                          <Upload />
                        </span>
                        {t.upload}
                      </button>
                    </div>
                  </Card>
                  <Card title={t.activity} action={t.allActivity} onAction={() => setActive("inventory")}>
                    {dashboard?.activity?.length ? <div className="activities">{dashboard.activity.map((item,index)=><Activity key={index} icon={History} text={item.description} time={new Date(item.created_at.replace(" ","T")+"Z").toLocaleDateString(lang === "PL" ? "pl-PL" : "en-GB")}/>)}</div> : <EmptyOverview icon={History} text={lang === "PL" ? "Brak ostatniej aktywności" : "No recent activity"} />}
                  </Card>
                </div>
              </section>
            </>
          )}
        </div>
        <nav className="mobileNav">
          {nav.slice(0, 4).map(([k, I]) => (
            <button
              className={active === k ? "active" : ""}
              onClick={() => setActive(k)}
              key={k}
            >
              <I />
              <span>{t[k]}</span>
            </button>
          ))}
        </nav>
      </main>
      {menu && <div className="scrim" onClick={() => setMenu(false)} />}
    </div>
  );
}
function Login({ lang, setLang, onLogin }) {
  const [mode, setMode] = useState("login");
  const [teamName, setTeamName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "register" && password !== confirmPassword)
        throw Error(lang === "PL" ? "Hasła nie są identyczne" : "Passwords do not match");
      const r = await fetch(apiUrl(mode === "register" ? "/auth/register" : "/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, name, email, password }),
      });
      const d = await r.json();
      if (!r.ok) throw Error(d.error);
      onLogin(d);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="loginPage">
      <div className="loginVisual">
        <Logo />
        <div>
          <span>RACE TEAM OPERATIONS</span>
          <h1>
            BUILT FOR
            <br />
            <em>THE GRID.</em>
          </h1>
          <p>
            Inventory, people and race weekends. One team, one source of truth.
          </p>
        </div>
        <small>D3TEAMS · 2026</small>
      </div>
      <div className="loginPanel">
        <div className="loginLang">
          <button
            className={lang === "EN" ? "selected" : ""}
            onClick={() => setLang("EN")}
          >
            EN
          </button>
          <button
            className={lang === "PL" ? "selected" : ""}
            onClick={() => setLang("PL")}
          >
            PL
          </button>
        </div>
        <form onSubmit={submit}>
          <p className="eyebrow">{mode === "register" ? "CREATE YOUR TEAM" : "SECURE TEAM ACCESS"}</p>
          <h2>{mode === "register" ? (lang === "PL" ? "Załóż konto zespołu" : "Create your team") : (lang === "PL" ? "Witaj ponownie" : "Welcome back")}</h2>
          <p>
            {mode === "register"
              ? (lang === "PL" ? "Utwórz przestrzeń pracy i konto właściciela." : "Set up your workspace and owner account.")
              : (lang === "PL" ? "Zaloguj się do swojego zespołu." : "Sign in to your team workspace.")}
          </p>
          {mode === "register" && <>
            <label>{lang === "PL" ? "Nazwa zespołu" : "Team name"}<input value={teamName} onChange={(e) => setTeamName(e.target.value)} required minLength={2} /></label>
            <label>{lang === "PL" ? "Imię i nazwisko" : "Your name"}<input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} autoComplete="name" /></label>
          </>}
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            {lang === "PL" ? "Hasło" : "Password"}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === "register" ? 10 : undefined}
              autoComplete={mode === "register" ? "new-password" : "current-password"}
            />
          </label>
          {mode === "register" && <label>
            {lang === "PL" ? "Powtórz hasło" : "Confirm password"}
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={10} autoComplete="new-password" />
          </label>}
          {mode === "register" && <small className="passwordHint">{lang === "PL" ? "Minimum 10 znaków, wielka i mała litera oraz cyfra." : "At least 10 characters with uppercase, lowercase and a number."}</small>}
          {error && <div className="loginError">{error}</div>}
          <button className="loginSubmit" disabled={loading}>
            {loading ? "…" : mode === "register" ? (lang === "PL" ? "Utwórz zespół" : "Create team") : (lang === "PL" ? "Zaloguj się" : "Sign in")}
            <ArrowUpRight />
          </button>
          <button type="button" className="authSwitch" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login"
              ? (lang === "PL" ? "Nie masz konta? Zarejestruj zespół" : "New to D3Teams? Create a team")
              : (lang === "PL" ? "Masz już konto? Zaloguj się" : "Already have an account? Sign in")}
          </button>
        </form>
      </div>
    </div>
  );
}

function AcceptInvitation({token,lang,setLang,onAccept}){
  const [invitation,setInvitation]=useState(null),[name,setName]=useState(""),[password,setPassword]=useState(""),[confirm,setConfirm]=useState(""),[error,setError]=useState(""),[loading,setLoading]=useState(true);
  useEffect(()=>{fetch(apiUrl(`/invitations/${token}`)).then(async r=>{const d=await r.json();if(!r.ok)throw Error(d.error);return d.invitation}).then(setInvitation).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[token]);
  const submit=async e=>{e.preventDefault();setError("");if(password!==confirm)return setError(lang==="PL"?"Hasła nie są identyczne":"Passwords do not match");setLoading(true);try{const r=await fetch(apiUrl(`/invitations/${token}/accept`),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,password})}),d=await r.json();if(!r.ok)throw Error(d.error);onAccept(d)}catch(e){setError(e.message)}finally{setLoading(false)}};
  return <div className="loginPage"><div className="loginVisual"><Logo/><div><span>TEAM INVITATION</span><h1>JOIN<br/><em>THE GRID.</em></h1><p>{invitation?`${invitation.teamName} · ${invitation.role}`:"D3Teams race operations"}</p></div><small>D3TEAMS · 2026</small></div><div className="loginPanel"><div className="loginLang"><button className={lang==="EN"?"selected":""} onClick={()=>setLang("EN")}>EN</button><button className={lang==="PL"?"selected":""} onClick={()=>setLang("PL")}>PL</button></div><form onSubmit={submit}><p className="eyebrow">SECURE INVITATION</p><h2>{lang==="PL"?"Dołącz do zespołu":"Join the team"}</h2>{invitation&&<p>{invitation.email} · {invitation.teamName}</p>}<label>{lang==="PL"?"Imię i nazwisko":"Full name"}<input value={name} onChange={e=>setName(e.target.value)} required minLength={2}/></label><label>{lang==="PL"?"Hasło":"Password"}<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={10}/></label><label>{lang==="PL"?"Powtórz hasło":"Confirm password"}<input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required minLength={10}/></label>{error&&<div className="loginError">{error}</div>}<button className="loginSubmit" disabled={loading||!invitation}>{loading?"…":lang==="PL"?"Dołącz do zespołu":"Join team"}<ArrowUpRight/></button></form></div></div>;
}

function TelemetryView({lang}){
  const [file,setFile]=useState(null);
  const L=lang==="PL"
    ? {eyebrow:"DANE WYŚCIGOWE",title:"Telemetria",sub:"Wgraj log z systemu telemetrii do dalszej analizy.",upload:"Wybierz plik logu",empty:"Nie wybrano jeszcze żadnego pliku",ready:"Plik gotowy do integracji analizatora"}
    : {eyebrow:"RACE DATA",title:"Telemetry",sub:"Upload a telemetry system log for further analysis.",upload:"Choose log file",empty:"No telemetry file selected yet",ready:"File ready for analyzer integration"};
  return <section className="modulePage telemetryPage">
    <div className="moduleTitle"><div><p className="eyebrow">{L.eyebrow}</p><h1>{L.title}</h1><p>{L.sub}</p></div></div>
    <article className="card telemetryUpload">
      <Radio/>
      <strong>{file?file.name:L.empty}</strong>
      {file&&<small>{(file.size/1024).toFixed(1)} KB · {L.ready}</small>}
      <label className="primary telemetryFile"> <Upload size={18}/>{L.upload}<input type="file" accept=".csv,.txt,.log,.ld,.xrk,.zip" onChange={e=>setFile(e.target.files?.[0]||null)}/></label>
    </article>
  </section>;
}

function CalendarView({ lang, session }) {
  const classOptions = [
    "OK",
    "OKN",
    "OKJ",
    "OKNJ",
    "KZ",
    "Mini",
    "Rotax Senior",
    "Rotax Junior",
    "ROK Senior",
    "ROK Junior",
    "ROK Mini",
    "ROK Baby",
    "Pokazy",
    "Puffo",
  ];
  const L =
    lang === "PL"
      ? {
          eyebrow: "SEZON 2026",
          title: "Kalendarz zespołu",
          sub: "Zawody, testy i wydarzenia zespołu w jednym miejscu.",
          add: "Nowe wydarzenie",
          upcoming: "Nadchodzące wydarzenia",
          race: "Zawody",
          test: "Test",
          training: "Trening",
          meeting: "Spotkanie",
          planned: "Planowane",
          confirmed: "Potwierdzone",
          completed: "Ukończone",
          cancelled: "Anulowane",
          eventTitle: "Nazwa wydarzenia",
          type: "Typ",
          status: "Status",
          start: "Data rozpoczęcia",
          end: "Data zakończenia",
          location: "Lokalizacja",
          track: "Tor / miejsce",
          championship: "Mistrzostwa",
          round: "Runda",
          arrival: "Przyjazd zespołu",
          notes: "Notatki",
          participants: "Uczestnicy",
          tasks: "zadań",
          newTitle: "Nowe wydarzenie",
          editTitle: "Edytuj wydarzenie",
          cancel: "Anuluj",
          save: "Zapisz",
          create: "Utwórz wydarzenie",
          delete: "Usuń",
          today: "Dzisiaj",
          pilot: "PILOT",
          raceClass: "KLASA",
          duration: "DNI",
          mechanic: "MECHANIK",
          crewTable: "OBSADA WYDARZENIA",
          addCrew: "Dodaj wiersz",
          days: ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"],
        }
      : {
          eyebrow: "2026 SEASON",
          title: "Team calendar",
          sub: "Races, tests and team events in one operational view.",
          add: "New event",
          upcoming: "Upcoming events",
          race: "Race",
          test: "Test",
          training: "Training",
          meeting: "Meeting",
          planned: "Planned",
          confirmed: "Confirmed",
          completed: "Completed",
          cancelled: "Cancelled",
          eventTitle: "Event title",
          type: "Type",
          status: "Status",
          start: "Start date",
          end: "End date",
          location: "Location",
          track: "Track / venue",
          championship: "Championship",
          round: "Round",
          arrival: "Team arrival",
          notes: "Notes",
          participants: "Participants",
          tasks: "tasks",
          newTitle: "New event",
          editTitle: "Edit event",
          cancel: "Cancel",
          save: "Save changes",
          create: "Create event",
          delete: "Delete",
          today: "Today",
          pilot: "PILOT",
          raceClass: "CLASS",
          duration: "DAYS",
          mechanic: "MECHANIC",
          crewTable: "EVENT CREW",
          addCrew: "Add row",
          days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        };
  const blank = {
    title: "",
    type: "race",
    status: "planned",
    startDate: "2026-07-21",
    endDate: "2026-07-21",
    location: "",
    track: "",
    championship: "",
    round: "",
    arrivalTime: "",
    notes: "",
    crewEntries: [{ pilot: "", raceClass: "OK", days: 1, mechanic: "" }],
    participantIds: [],
  };
  const [events, setEvents] = useState([]),
    [members, setMembers] = useState([]),
    [viewDate, setViewDate] = useState(new Date(2026, 6, 1)),
    [modal, setModal] = useState(null),
    [selected, setSelected] = useState(null),
    [draft, setDraft] = useState(blank),
    [error, setError] = useState("");
  const canManage = ["owner", "manager"].includes(session.user.role);
  const api = async (path, options = {}) => {
    const r = await fetch(apiUrl(path), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      throw Error(d.error || "Request failed");
    }
    return r.status === 204 ? null : r.json();
  };
  const refresh = async () => {
    try {
      const [e, u] = await Promise.all([api("/events"), api("/team/users")]);
      setEvents(e.events);
      setMembers(u.users.filter((x) => x.active));
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    refresh();
  }, []);
  const openAdd = () => {
    setSelected(null);
    setDraft({ ...blank, participantIds: members.map((x) => x.id) });
    setModal("edit");
  };
  const openEvent = (e) => {
    setSelected(e);
    setDraft({
      title: e.title,
      type: e.type,
      status: e.status,
      startDate: e.start_date,
      endDate: e.end_date,
      location: e.location,
      track: e.track,
      championship: e.championship,
      round: e.round,
      arrivalTime: e.arrival_time,
      notes: e.notes,
      crewEntries: e.crewEntries?.length
        ? e.crewEntries
        : [{ pilot: "", raceClass: "OK", days: 1, mechanic: "" }],
      participantIds: e.participantIds,
    });
    setModal("edit");
  };
  const save = async () => {
    try {
      await api(selected ? `/events/${selected.id}` : "/events", {
        method: selected ? "PUT" : "POST",
        body: JSON.stringify(draft),
      });
      setModal(null);
      refresh();
    } catch (e) {
      setError(e.message);
    }
  };
  const remove = async () => {
    try {
      await api(`/events/${selected.id}`, { method: "DELETE" });
      setModal(null);
      refresh();
    } catch (e) {
      setError(e.message);
    }
  };
  const year = viewDate.getFullYear(),
    month = viewDate.getMonth(),
    monthName = viewDate.toLocaleString(lang === "PL" ? "pl-PL" : "en-GB", {
      month: "long",
      year: "numeric",
    }),
    first = new Date(year, month, 1),
    offset = (first.getDay() + 6) % 7,
    cells = Array.from(
      { length: 42 },
      (_, i) => new Date(year, month, 1 - offset + i),
    );
  const iso = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const icon = (t) =>
    t === "race" ? (
      <Trophy />
    ) : t === "test" ? (
      <FlaskConical />
    ) : t === "training" ? (
      <Dumbbell />
    ) : (
      <MessageSquare />
    );
  return (
    <section className="calendarPage">
      <div className="pageTitle">
        <div>
          <p className="eyebrow">{L.eyebrow}</p>
          <h1>{L.title}</h1>
          <p>{L.sub}</p>
        </div>
        {canManage && (
          <button className="primary" onClick={openAdd}>
            <Plus />
            {L.add}
          </button>
        )}
      </div>
      {error && (
        <div className="apiError" onClick={() => setError("")}>
          <AlertTriangle />
          {error}
          <X />
        </div>
      )}
      <div className="calendarLayout">
        <div className="calendarCard">
          <div className="calendarTop">
            <button onClick={() => setViewDate(new Date(year, month - 1, 1))}>
              <ChevronLeft />
            </button>
            <h2>{monthName}</h2>
            <button onClick={() => setViewDate(new Date(year, month + 1, 1))}>
              <ChevronRight />
            </button>
            <button
              className="todayBtn"
              onClick={() => setViewDate(new Date(2026, 6, 1))}
            >
              {L.today}
            </button>
          </div>
          <div className="weekDays">
            {L.days.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <div className="monthGrid">
            {cells.map((d, i) => {
              const dayEvents = events.filter(
                (e) => e.start_date <= iso(d) && e.end_date >= iso(d),
              );
              return (
                <div
                  className={
                    "dayCell " +
                    (d.getMonth() !== month ? "outside" : "") +
                    (iso(d) === "2026-07-14" ? " current" : "")
                  }
                  key={i}
                >
                  <span>{d.getDate()}</span>
                  {dayEvents.slice(0, 2).map((e) => (
                    <button
                      className={"miniEvent " + e.type}
                      onClick={() => openEvent(e)}
                      key={e.id}
                    >
                      {icon(e.type)}
                      <b>{e.title}</b>
                    </button>
                  ))}
                  {dayEvents.length > 2 && (
                    <small>+{dayEvents.length - 2}</small>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <aside className="upcoming">
          <div className="cardHead">
            <h3>{L.upcoming}</h3>
            <span>
              {events.filter((e) => e.end_date >= "2026-07-14").length}
            </span>
          </div>
          {events
            .filter((e) => e.end_date >= "2026-07-14")
            .map((e) => (
              <article
                className={"upcomingEvent " + e.type}
                onClick={() => openEvent(e)}
                key={e.id}
              >
                <div className="eventDate">
                  <b>{new Date(e.start_date + "T00:00").getDate()}</b>
                  <span>
                    {new Date(e.start_date + "T00:00")
                      .toLocaleString(lang === "PL" ? "pl-PL" : "en-GB", {
                        month: "short",
                      })
                      .toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="eventType">
                    {icon(e.type)}
                    {L[e.type]}
                  </span>
                  <h3>{e.title}</h3>
                  <p>
                    <MapPin />
                    {e.track || e.location}
                  </p>
                  <div>
                    <span className={"eventStatus " + e.status}>
                      {L[e.status]}
                    </span>
                    <span>
                      <ClipboardCheck />
                      {e.taskCount} {L.tasks}
                    </span>
                    <span>
                      <Users />
                      {e.participants.length}
                    </span>
                  </div>
                </div>
              </article>
            ))}
        </aside>
      </div>
      {modal && (
        <div className="modalBackdrop" onClick={() => setModal(null)}>
          <div
            className="modal eventModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHead">
              <h2>{selected ? L.editTitle : L.newTitle}</h2>
              <button aria-label="Close" onClick={() => setModal(null)}>
                <X />
              </button>
            </div>
            <div className="form">
              <label>
                {L.eventTitle}
                <input
                  value={draft.title}
                  disabled={!canManage}
                  onChange={(e) =>
                    setDraft({ ...draft, title: e.target.value })
                  }
                />
              </label>
              <div>
                <label>
                  {L.type}
                  <select
                    value={draft.type}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, type: e.target.value })
                    }
                  >
                    {["race", "test", "training", "meeting"].map((x) => (
                      <option value={x} key={x}>
                        {L[x]}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {L.status}
                  <select
                    value={draft.status}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, status: e.target.value })
                    }
                  >
                    {["planned", "confirmed", "completed", "cancelled"].map(
                      (x) => (
                        <option value={x} key={x}>
                          {L[x]}
                        </option>
                      ),
                    )}
                  </select>
                </label>
              </div>
              <div>
                <label>
                  {L.start}
                  <input
                    type="date"
                    value={draft.startDate}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, startDate: e.target.value })
                    }
                  />
                </label>
                <label>
                  {L.end}
                  <input
                    type="date"
                    value={draft.endDate}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, endDate: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="crewEditor">
                <div className="crewTitle">
                  <span>{L.crewTable}</span>
                  {canManage && (
                    <button
                      onClick={() =>
                        setDraft({
                          ...draft,
                          crewEntries: [
                            ...draft.crewEntries,
                            {
                              pilot: "",
                              raceClass: "OK",
                              days: 1,
                              mechanic: "",
                            },
                          ],
                        })
                      }
                    >
                      <Plus />
                      {L.addCrew}
                    </button>
                  )}
                </div>
                <div className="crewHead">
                  <span>{L.pilot}</span>
                  <span>{L.raceClass}</span>
                  <span>{L.duration}</span>
                  <span>{L.mechanic}</span>
                  <span />
                </div>
                {draft.crewEntries.map((row, i) => (
                  <div className="crewRow" key={i}>
                    <input
                      aria-label={`${L.pilot} ${i + 1}`}
                      value={row.pilot}
                      disabled={!canManage}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          crewEntries: draft.crewEntries.map((x, n) =>
                            n === i ? { ...x, pilot: e.target.value } : x,
                          ),
                        })
                      }
                    />
                    <select
                      aria-label={`${L.raceClass} ${i + 1}`}
                      value={row.raceClass}
                      disabled={!canManage}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          crewEntries: draft.crewEntries.map((x, n) =>
                            n === i ? { ...x, raceClass: e.target.value } : x,
                          ),
                        })
                      }
                    >
                      {classOptions.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <input
                      aria-label={`${L.duration} ${i + 1}`}
                      type="number"
                      min="1"
                      value={row.days}
                      disabled={!canManage}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          crewEntries: draft.crewEntries.map((x, n) =>
                            n === i ? { ...x, days: +e.target.value } : x,
                          ),
                        })
                      }
                    />
                    <input
                      aria-label={`${L.mechanic} ${i + 1}`}
                      value={row.mechanic}
                      disabled={!canManage}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          crewEntries: draft.crewEntries.map((x, n) =>
                            n === i ? { ...x, mechanic: e.target.value } : x,
                          ),
                        })
                      }
                    />
                    {canManage && (
                      <button
                        aria-label={`Remove crew ${i + 1}`}
                        disabled={draft.crewEntries.length === 1}
                        onClick={() =>
                          setDraft({
                            ...draft,
                            crewEntries: draft.crewEntries.filter(
                              (_, n) => n !== i,
                            ),
                          })
                        }
                      >
                        <Trash2 />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <label>
                  {L.location}
                  <input
                    value={draft.location}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, location: e.target.value })
                    }
                  />
                </label>
                <label>
                  {L.track}
                  <input
                    value={draft.track}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, track: e.target.value })
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  {L.championship}
                  <input
                    value={draft.championship}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, championship: e.target.value })
                    }
                  />
                </label>
                <label>
                  {L.round}
                  <input
                    value={draft.round}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, round: e.target.value })
                    }
                  />
                </label>
              </div>
              <label>
                {L.arrival}
                <input
                  type="datetime-local"
                  value={draft.arrivalTime?.replace(" ", "T")}
                  disabled={!canManage}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      arrivalTime: e.target.value.replace("T", " "),
                    })
                  }
                />
              </label>
              <label>
                {L.notes}
                <textarea
                  value={draft.notes}
                  disabled={!canManage}
                  onChange={(e) =>
                    setDraft({ ...draft, notes: e.target.value })
                  }
                />
              </label>
              <div className="participantPicker">
                <span>{L.participants}</span>
                {members.map((m) => (
                  <label key={m.id}>
                    <input
                      type="checkbox"
                      disabled={!canManage}
                      checked={draft.participantIds.includes(m.id)}
                      onChange={() =>
                        setDraft({
                          ...draft,
                          participantIds: draft.participantIds.includes(m.id)
                            ? draft.participantIds.filter((x) => x !== m.id)
                            : [...draft.participantIds, m.id],
                        })
                      }
                    />
                    <i>
                      {m.name
                        .split(" ")
                        .map((x) => x[0])
                        .join("")
                        .slice(0, 2)}
                    </i>
                    <b>{m.name}</b>
                    <small>{m.role}</small>
                  </label>
                ))}
              </div>
            </div>
            <div className="modalActions">
              {canManage && selected && (
                <button className="deleteLink" onClick={remove}>
                  <Trash2 />
                  {L.delete}
                </button>
              )}
              <button className="secondary" onClick={() => setModal(null)}>
                {L.cancel}
              </button>
              {canManage && (
                <button className="primary" onClick={save}>
                  {selected ? L.save : L.create}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function TasksView({ lang, session }) {
  const L =
    lang === "PL"
      ? {
          eyebrow: "PRZYGOTOWANIE WYŚCIGOWE",
          title: "Zadania zespołu",
          sub: "Planuj, przydzielaj i śledź prace zespołu.",
          add: "Nowe zadanie",
          all: "Wszystkie",
          mine: "Moje zadania",
          todo: "Do zrobienia",
          progress: "W toku",
          blocked: "Zablokowane",
          done: "Ukończone",
          critical: "Krytyczny",
          high: "Wysoki",
          medium: "Średni",
          low: "Niski",
          due: "Termin",
          assignee: "Wykonawca",
          unassigned: "Nieprzypisane",
          kart: "Kart",
          event: "Wydarzenie",
          checklist: "Checklista",
          newTitle: "Nowe zadanie",
          editTitle: "Edytuj zadanie",
          taskTitle: "Tytuł",
          description: "Opis",
          priority: "Priorytet",
          status: "Status",
          date: "Termin",
          cancel: "Anuluj",
          save: "Zapisz",
          create: "Utwórz zadanie",
          delete: "Usuń",
          addItem: "Dodaj punkt checklisty",
          empty: "Brak zadań",
          overdue: "PO TERMINIE",
        }
      : {
          eyebrow: "RACE PREPARATION",
          title: "Team tasks",
          sub: "Plan, assign and track work across the team.",
          add: "New task",
          all: "All tasks",
          mine: "My tasks",
          todo: "To do",
          progress: "In progress",
          blocked: "Blocked",
          done: "Completed",
          critical: "Critical",
          high: "High",
          medium: "Medium",
          low: "Low",
          due: "Due",
          assignee: "Assignee",
          unassigned: "Unassigned",
          kart: "Kart",
          event: "Event",
          checklist: "Checklist",
          newTitle: "New task",
          editTitle: "Edit task",
          taskTitle: "Task title",
          description: "Description",
          priority: "Priority",
          status: "Status",
          date: "Due date",
          cancel: "Cancel",
          save: "Save changes",
          create: "Create task",
          delete: "Delete",
          addItem: "Add checklist item",
          empty: "No tasks here",
          overdue: "OVERDUE",
        };
  const blank = {
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "2026-07-17",
    assigneeId: "",
    kart: "",
    event: "Polish Championship · R4",
    checklist: [],
  };
  const [tasks, setTasks] = useState([]),
    [members, setMembers] = useState([]),
    [scope, setScope] = useState("all"),
    [modal, setModal] = useState(null),
    [selected, setSelected] = useState(null),
    [draft, setDraft] = useState(blank),
    [newItem, setNewItem] = useState(""),
    [error, setError] = useState("");
  const canManage = ["owner", "manager"].includes(session.user.role);
  const api = async (path, options = {}) => {
    const r = await fetch(apiUrl(path), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      throw Error(d.error || "Request failed");
    }
    return r.status === 204 ? null : r.json();
  };
  const refresh = async () => {
    try {
      const [t, u] = await Promise.all([api("/tasks"), api("/team/users")]);
      setTasks(t.tasks);
      setMembers(
        u.users.filter(
          (x) => x.active && ["mechanic", "manager", "owner"].includes(x.role),
        ),
      );
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    refresh();
  }, []);
  const visible = tasks.filter(
    (t) => scope === "all" || t.assignee?.id === session.user.id,
  );
  const columns = ["todo", "progress", "blocked", "done"];
  const openAdd = () => {
    setSelected(null);
    setDraft(blank);
    setModal("edit");
  };
  const openTask = (t) => {
    setSelected(t);
    setDraft({
      title: t.title,
      description: t.description,
      priority: t.priority,
      status: t.status,
      dueDate: t.due_date || "",
      assigneeId: t.assignee?.id || "",
      kart: t.kart || "",
      event: t.event || "",
      checklist: t.checklist || [],
    });
    setModal(canManage ? "edit" : "detail");
  };
  const save = async () => {
    try {
      await api(selected ? `/tasks/${selected.id}` : "/tasks", {
        method: selected ? "PUT" : "POST",
        body: JSON.stringify({
          ...draft,
          assigneeId: draft.assigneeId || null,
        }),
      });
      setModal(null);
      refresh();
    } catch (e) {
      setError(e.message);
    }
  };
  const progress = async (t, status = t.status, checklist = t.checklist) => {
    try {
      await api(`/tasks/${t.id}/progress`, {
        method: "PATCH",
        body: JSON.stringify({ status, checklist }),
      });
      refresh();
      if (selected?.id === t.id) setSelected({ ...t, status, checklist });
    } catch (e) {
      setError(e.message);
    }
  };
  const remove = async () => {
    try {
      await api(`/tasks/${selected.id}`, { method: "DELETE" });
      setModal(null);
      refresh();
    } catch (e) {
      setError(e.message);
    }
  };
  const toggleCheck = (t, i) => {
    const checklist = t.checklist.map((x, n) =>
      n === i ? { ...x, done: !x.done } : x,
    );
    setDraft((d) => ({ ...d, checklist }));
    progress(t, t.status, checklist);
  };
  const completed = (t) =>
    t.checklist.length
      ? Math.round(
          (t.checklist.filter((x) => x.done).length / t.checklist.length) * 100,
        )
      : 0;
  return (
    <section className="tasksPage">
      <div className="pageTitle">
        <div>
          <p className="eyebrow">{L.eyebrow}</p>
          <h1>{L.title}</h1>
          <p>{L.sub}</p>
        </div>
        {canManage && (
          <button className="primary" onClick={openAdd}>
            <Plus />
            {L.add}
          </button>
        )}
      </div>
      {error && (
        <div className="apiError" onClick={() => setError("")}>
          <AlertTriangle />
          {error}
          <X />
        </div>
      )}
      <div className="taskSummary">
        {columns.map((c) => (
          <div key={c} className={"summary-" + c}>
            <span>
              {c === "todo" ? (
                <Circle />
              ) : c === "progress" ? (
                <PlayCircle />
              ) : c === "blocked" ? (
                <Ban />
              ) : (
                <CheckCircle2 />
              )}
            </span>
            <p>
              <b>{tasks.filter((t) => t.status === c).length}</b>
              <small>{L[c]}</small>
            </p>
          </div>
        ))}
      </div>
      <div className="taskToolbar">
        <div className="scopeSwitch">
          <button
            className={scope === "all" ? "active" : ""}
            onClick={() => setScope("all")}
          >
            {L.all}
          </button>
          <button
            className={scope === "mine" ? "active" : ""}
            onClick={() => setScope("mine")}
          >
            {L.mine}
          </button>
        </div>
        <span>{visible.length} TASKS</span>
      </div>
      <div className="kanban">
        {columns.map((col) => (
          <div className={"taskColumn col-" + col} key={col}>
            <div className="columnHead">
              <span>{L[col]}</span>
              <b>{visible.filter((t) => t.status === col).length}</b>
            </div>
            <div className="columnBody">
              {visible
                .filter((t) => t.status === col)
                .map((t) => (
                  <article
                    className="taskCard"
                    key={t.id}
                    onClick={() => openTask(t)}
                  >
                    <div className="taskCardTop">
                      <span className={"priority " + t.priority}>
                        <Flag />
                        {L[t.priority]}
                      </span>
                      {canManage && (
                        <button
                          aria-label={`Edit ${t.title}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openTask(t);
                          }}
                        >
                          <Pencil />
                        </button>
                      )}
                    </div>
                    <h3>{t.title}</h3>
                    <p>{t.description}</p>
                    {t.kart && (
                      <span className="kartTag">
                        <Wrench />
                        {t.kart}
                      </span>
                    )}
                    <div className="taskMeta">
                      <span
                        className={
                          new Date(t.due_date) < new Date("2026-07-14") &&
                          t.status !== "done"
                            ? "late"
                            : ""
                        }
                      >
                        <CalendarDays />
                        {t.due_date || "—"}
                      </span>
                      <span>
                        <CircleUserRound />
                        {t.assignee?.name || L.unassigned}
                      </span>
                    </div>
                    {t.checklist.length > 0 && (
                      <div className="taskProgress">
                        <div>
                          <span>{L.checklist}</span>
                          <b>
                            {t.checklist.filter((x) => x.done).length}/
                            {t.checklist.length}
                          </b>
                        </div>
                        <div className="bar">
                          <i style={{ width: completed(t) + "%" }} />
                        </div>
                      </div>
                    )}
                    {session.user.role === "mechanic" &&
                      t.assignee?.id === session.user.id && (
                        <div
                          className="cardStatus"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {columns.map((s) => (
                            <button
                              title={L[s]}
                              className={t.status === s ? "active" : ""}
                              onClick={() => progress(t, s)}
                              key={s}
                            >
                              {s === "todo" ? (
                                <Circle />
                              ) : s === "progress" ? (
                                <PlayCircle />
                              ) : s === "blocked" ? (
                                <Ban />
                              ) : (
                                <CheckCircle2 />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                  </article>
                ))}
              {!visible.some((t) => t.status === col) && (
                <div className="columnEmpty">{L.empty}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <div className="modalBackdrop" onClick={() => setModal(null)}>
          <div className="modal taskModal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHead">
              <h2>{selected ? L.editTitle : L.newTitle}</h2>
              <button aria-label="Close" onClick={() => setModal(null)}>
                <X />
              </button>
            </div>
            <div className="form">
              <label>
                {L.taskTitle}
                <input
                  value={draft.title}
                  disabled={!canManage}
                  onChange={(e) =>
                    setDraft({ ...draft, title: e.target.value })
                  }
                />
              </label>
              <label>
                {L.description}
                <textarea
                  value={draft.description}
                  disabled={!canManage}
                  onChange={(e) =>
                    setDraft({ ...draft, description: e.target.value })
                  }
                />
              </label>
              <div>
                <label>
                  {L.priority}
                  <select
                    value={draft.priority}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, priority: e.target.value })
                    }
                  >
                    {["critical", "high", "medium", "low"].map((x) => (
                      <option value={x} key={x}>
                        {L[x]}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {L.status}
                  <select
                    value={draft.status}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, status: e.target.value })
                    }
                  >
                    {columns.map((x) => (
                      <option value={x} key={x}>
                        {L[x]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label>
                  {L.date}
                  <input
                    type="date"
                    value={draft.dueDate}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, dueDate: e.target.value })
                    }
                  />
                </label>
                <label>
                  {L.assignee}
                  <select
                    value={draft.assigneeId}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, assigneeId: e.target.value })
                    }
                  >
                    <option value="">{L.unassigned}</option>
                    {members.map((m) => (
                      <option value={m.id} key={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label>
                  {L.kart}
                  <input
                    value={draft.kart}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, kart: e.target.value })
                    }
                  />
                </label>
                <label>
                  {L.event}
                  <input
                    value={draft.event}
                    disabled={!canManage}
                    onChange={(e) =>
                      setDraft({ ...draft, event: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="checklistEditor">
                <span>{L.checklist}</span>
                {draft.checklist.map((x, i) => (
                  <div key={i}>
                    <button
                      disabled={!selected}
                      onClick={() => selected && toggleCheck(selected, i)}
                    >
                      {x.done ? <CheckCircle2 /> : <Circle />}
                    </button>
                    <input
                      value={x.text}
                      disabled={!canManage}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          checklist: draft.checklist.map((v, n) =>
                            n === i ? { ...v, text: e.target.value } : v,
                          ),
                        })
                      }
                    />
                    {canManage && (
                      <button
                        onClick={() =>
                          setDraft({
                            ...draft,
                            checklist: draft.checklist.filter(
                              (_, n) => n !== i,
                            ),
                          })
                        }
                      >
                        <X />
                      </button>
                    )}
                  </div>
                ))}
                {canManage && (
                  <div className="addCheck">
                    <input
                      placeholder={L.addItem}
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (newItem.trim()) {
                          setDraft({
                            ...draft,
                            checklist: [
                              ...draft.checklist,
                              { text: newItem, done: false },
                            ],
                          });
                          setNewItem("");
                        }
                      }}
                    >
                      <Plus />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="modalActions">
              {canManage && selected && (
                <button className="deleteLink" onClick={remove}>
                  <Trash2 />
                  {L.delete}
                </button>
              )}
              <button className="secondary" onClick={() => setModal(null)}>
                {L.cancel}
              </button>
              {canManage && (
                <button className="primary" onClick={save}>
                  {selected ? L.save : L.create}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function TeamView({ lang, session }) {
  const L =
    lang === "PL"
      ? {
          eyebrow: "ZARZĄDZANIE DOSTĘPEM",
          title: "Zespół D3 Karting",
          sub: "Zarządzaj członkami zespołu, rolami i dostępem.",
          add: "Zaproś członka",
          members: "członków",
          active: "aktywnych",
          roles: "role",
          search: "Szukaj po nazwie lub emailu…",
          all: "Wszyscy",
          owner: "Właściciel",
          manager: "Team Manager",
          mechanic: "Mechanik",
          driver: "Kierowca",
          status: "Status",
          edit: "Edytuj",
          deactivate: "Dezaktywuj",
          activate: "Aktywuj",
          delete: "Usuń",
          addTitle: "Zaproś członka zespołu",
          editTitle: "Edytuj członka",
          name: "Imię i nazwisko",
          email: "Email",
          password: "Hasło tymczasowe",
          role: "Rola",
          cancel: "Anuluj",
          save: "Zapisz",
          create: "Utwórz konto",
          deleteTitle: "Usunąć członka?",
          deleteText: "Konto i dostęp zostaną trwale usunięte.",
          inactive: "Nieaktywny",
          noResults: "Brak członków spełniających kryteria",
        }
      : {
          eyebrow: "ACCESS MANAGEMENT",
          title: "D3 Karting team",
          sub: "Manage team members, roles and workspace access.",
          add: "Invite member",
          members: "members",
          active: "active",
          roles: "roles",
          search: "Search by name or email…",
          all: "All members",
          owner: "Owner",
          manager: "Team Manager",
          mechanic: "Mechanic",
          driver: "Driver",
          status: "Status",
          edit: "Edit",
          deactivate: "Deactivate",
          activate: "Activate",
          delete: "Delete",
          addTitle: "Invite team member",
          editTitle: "Edit member",
          name: "Full name",
          email: "Email",
          password: "Temporary password",
          role: "Role",
          cancel: "Cancel",
          save: "Save changes",
          create: "Create account",
          deleteTitle: "Delete team member?",
          deleteText: "Their account and access will be permanently removed.",
          inactive: "Inactive",
          noResults: "No team members match your search",
        };
  const [users, setUsers] = useState([]),
    [invitations, setInvitations] = useState([]),
    [inviteResult, setInviteResult] = useState(null),
    [query, setQuery] = useState(""),
    [roleFilter, setRoleFilter] = useState("all"),
    [modal, setModal] = useState(null),
    [selected, setSelected] = useState(null),
    [error, setError] = useState("");
  const blank = {
    name: "",
    email: "",
    password: "",
    role: "mechanic",
    active: true,
  };
  const [draft, setDraft] = useState(blank);
  const canManage = ["owner", "manager"].includes(session.user.role);
  const api = async (path, options = {}) => {
    const r = await fetch(apiUrl(path), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      throw Error(d.error || "Request failed");
    }
    return r.status === 204 ? null : r.json();
  };
  const refresh = async () => {
    try {
      setUsers((await api("/team/users")).users);
      if (canManage) setInvitations((await api("/team/invitations")).invitations);
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    refresh();
  }, []);
  const visible = users.filter(
    (u) =>
      (roleFilter === "all" || u.role === roleFilter) &&
      (u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())),
  );
  const openAdd = () => {
    setSelected(null);
    setDraft(blank);
    setInviteResult(null);
    setModal("edit");
  };
  const openEdit = (u) => {
    setSelected(u);
    setDraft({ ...u, password: "" });
    setModal("edit");
  };
  const save = async () => {
    try {
      if (!selected) {
        const result = await api("/team/invitations", {method:"POST",body:JSON.stringify({email:draft.email,role:draft.role})});
        setInviteResult(result.invitation);
        refresh();
      } else {
        await api(`/team/users/${selected.id}`, {method:"PUT",body:JSON.stringify(draft)});
        setModal(null);
        refresh();
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const revokeInvitation=async id=>{try{await api(`/team/invitations/${id}`,{method:"DELETE"});refresh()}catch(e){setError(e.message)}};
  const copyInvite=async link=>{await navigator.clipboard.writeText(link);};
  const toggle = async (u) => {
    try {
      await api(`/team/users/${u.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...u, active: !u.active }),
      });
      refresh();
    } catch (e) {
      setError(e.message);
    }
  };
  const remove = async () => {
    try {
      await api(`/team/users/${selected.id}`, { method: "DELETE" });
      setModal(null);
      refresh();
    } catch (e) {
      setError(e.message);
    }
  };
  const roles =
    session.user.role === "owner"
      ? ["owner", "manager", "mechanic", "driver"]
      : ["mechanic", "driver"];
  return (
    <section className="teamPage">
      <div className="pageTitle">
        <div>
          <p className="eyebrow">{L.eyebrow}</p>
          <h1>{L.title}</h1>
          <p>{L.sub}</p>
        </div>
        {canManage && (
          <button className="primary" onClick={openAdd}>
            <UserPlus />
            {L.add}
          </button>
        )}
      </div>
      {error && (
        <div className="apiError" onClick={() => setError("")}>
          <AlertTriangle />
          {error}
          <X />
        </div>
      )}
      <div className="teamStats">
        <div>
          <span>
            <Users />
          </span>
          <p>
            <b>{users.length}</b>
            <small>{L.members}</small>
          </p>
        </div>
        <div>
          <span>
            <UserCheck />
          </span>
          <p>
            <b>{users.filter((u) => u.active).length}</b>
            <small>{L.active}</small>
          </p>
        </div>
        <div>
          <span>
            <ShieldCheck />
          </span>
          <p>
            <b>{new Set(users.map((u) => u.role)).size}</b>
            <small>{L.roles}</small>
          </p>
        </div>
      </div>
      {canManage && invitations.length > 0 && <div className="pendingInvites"><div className="pendingTitle"><Mail/><strong>{lang === "PL" ? "Oczekujące zaproszenia" : "Pending invitations"}</strong><b>{invitations.length}</b></div>{invitations.map(inv=><div className="pendingInvite" key={inv.id}><span>{inv.email}</span><small>{L[inv.role]} · {lang === "PL" ? "ważne do" : "expires"} {new Date(inv.expiresAt).toLocaleDateString(lang === "PL" ? "pl-PL" : "en-GB")}</small><button onClick={()=>revokeInvitation(inv.id)}><Trash2/>{lang === "PL" ? "Odwołaj" : "Revoke"}</button></div>)}</div>}
      <div className="memberTools">
        <div className="inventorySearch">
          <Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={L.search}
          />
        </div>
        <div className="filters">
          <SlidersHorizontal />
          {["all", "owner", "manager", "mechanic", "driver"].map((r) => (
            <button
              key={r}
              className={roleFilter === r ? "selected" : ""}
              onClick={() => setRoleFilter(r)}
            >
              {r === "all" ? L.all : L[r]}
              <b>
                {r === "all"
                  ? users.length
                  : users.filter((u) => u.role === r).length}
              </b>
            </button>
          ))}
        </div>
      </div>
      <div className="memberGrid">
        {visible.map((u) => {
          const editable =
            canManage &&
            !(
              session.user.role === "manager" &&
              ["owner", "manager"].includes(u.role)
            );
          return (
            <article
              className={"memberCard " + (!u.active ? "disabled" : "")}
              key={u.id}
            >
              <div className={"memberAvatar role-" + u.role}>
                {u.name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="memberIdentity">
                <h3>
                  {u.name}
                  {u.id === session.user.id && <small>YOU</small>}
                </h3>
                <p>
                  <Mail />
                  {u.email}
                </p>
              </div>
              <span className={"roleBadge " + u.role}>
                <ShieldCheck />
                {L[u.role]}
              </span>
              <span className={"accessState " + (u.active ? "on" : "off")}>
                <i />
                {u.active ? L.active : L.inactive}
              </span>
              {editable && (
                <div className="memberActions">
                  <button onClick={() => openEdit(u)}>
                    <Pencil />
                    {L.edit}
                  </button>
                  {u.id !== session.user.id && (
                    <button onClick={() => toggle(u)}>
                      {u.active ? <UserX /> : <UserCheck />}
                      {u.active ? L.deactivate : L.activate}
                    </button>
                  )}
                  {session.user.role === "owner" &&
                    u.id !== session.user.id && (
                      <button
                        className="dangerText"
                        onClick={() => {
                          setSelected(u);
                          setModal("delete");
                        }}
                      >
                        <Trash2 />
                        {L.delete}
                      </button>
                    )}
                </div>
              )}
            </article>
          );
        })}
        {!visible.length && (
          <div className="empty memberEmpty">{L.noResults}</div>
        )}
      </div>
      {modal && (
        <div className="modalBackdrop" onClick={() => setModal(null)}>
          <div
            className={"modal " + (modal === "delete" ? "deleteModal" : "")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHead">
              <h2>
                {modal === "delete"
                  ? L.deleteTitle
                  : selected
                    ? L.editTitle
                    : L.addTitle}
              </h2>
              <button aria-label="Close" onClick={() => setModal(null)}>
                <X />
              </button>
            </div>
            {modal === "edit" && !inviteResult && (
              <div className="form">
                {selected && <label>
                  {L.name}
                  <input
                    value={draft.name}
                    onChange={(e) =>
                      setDraft({ ...draft, name: e.target.value })
                    }
                  />
                </label>}
                <label>
                  {L.email}
                  <input
                    type="email"
                    value={draft.email}
                    disabled={!!selected}
                    onChange={(e) =>
                      setDraft({ ...draft, email: e.target.value })
                    }
                  />
                </label>
                <label>
                  {L.role}
                  <select
                    value={draft.role}
                    onChange={(e) =>
                      setDraft({ ...draft, role: e.target.value })
                    }
                  >
                    {roles.map((r) => (
                      <option value={r} key={r}>
                        {L[r]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            {inviteResult && <div className="inviteResult"><span><Mail/></span><strong>{lang === "PL" ? "Zaproszenie gotowe" : "Invitation ready"}</strong><p>{inviteResult.email}</p><div><input readOnly value={inviteResult.inviteLink}/><button onClick={()=>copyInvite(inviteResult.inviteLink)}><Copy/>{lang === "PL" ? "Kopiuj" : "Copy link"}</button></div><small>{lang === "PL" ? "Link jest ważny przez 7 dni." : "The link is valid for 7 days."}</small></div>}
            {modal === "delete" && (
              <div className="deleteContent">
                <span>
                  <Trash2 />
                </span>
                <p>
                  <strong>{selected?.name}</strong>
                  {L.deleteText}
                </p>
              </div>
            )}
            <div className="modalActions">
              <button className="secondary" onClick={() => setModal(null)}>
                {L.cancel}
              </button>
              {!inviteResult && <button
                className={modal === "delete" ? "dangerButton" : "primary"}
                onClick={modal === "delete" ? remove : save}
              >
                {modal === "delete" ? L.delete : selected ? L.save : (lang === "PL" ? "Utwórz zaproszenie" : "Create invitation")}
              </button>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
const initialParts = [
  {
    id: "BRK-001",
    name: "Brake pads CRG VEN 05",
    category: "Brakes",
    base: 0,
    truck: 0,
    min: 4,
    unit: "sets",
  },
  {
    id: "CHN-219",
    name: "Chain 219 O-Ring",
    category: "Drivetrain",
    base: 18,
    truck: 3,
    min: 8,
    unit: "pcs",
  },
  {
    id: "OIL-001",
    name: "Xeramic Racing Oil 1L",
    category: "Fluids",
    base: 12,
    truck: 4,
    min: 6,
    unit: "bottles",
  },
  {
    id: "TYR-MG-R",
    name: "MG Red slick tyres",
    category: "Tyres",
    base: 24,
    truck: 8,
    min: 12,
    unit: "tyres",
  },
  {
    id: "TYR-MG-W",
    name: "MG Wet tyres",
    category: "Tyres",
    base: 8,
    truck: 4,
    min: 8,
    unit: "tyres",
  },
  {
    id: "SPK-NGK",
    name: "NGK BR10EG spark plug",
    category: "Engine",
    base: 16,
    truck: 6,
    min: 10,
    unit: "pcs",
  },
  {
    id: "SPR-80",
    name: "Rear sprocket 80T",
    category: "Drivetrain",
    base: 5,
    truck: 2,
    min: 4,
    unit: "pcs",
  },
  {
    id: "CBL-ACC",
    name: "Accelerator cable complete",
    category: "Controls",
    base: 3,
    truck: 1,
    min: 3,
    unit: "pcs",
  },
];
function InventoryView({ lang, session }) {
  const L =
    lang === "PL"
      ? {
          eyebrow: "OPERACJE MAGAZYNOWE",
          title: "Magazyn części",
          sub: "Kontroluj stany w bazie i ciężarówce.",
          add: "Dodaj część",
          move: "Przenieś",
          all: "Wszystkie",
          low: "Niski stan",
          out: "Brak",
          search: "Szukaj po nazwie lub SKU…",
          part: "CZĘŚĆ",
          category: "KATEGORIA",
          base: "BAZA",
          truck: "CIĘŻARÓWKA",
          total: "RAZEM",
          status: "STATUS",
          actions: "AKCJE",
          inStock: "Dostępne",
          lowLabel: "Niski stan",
          outLabel: "Brak",
          locations: "lokalizacje",
          units: "sztuk łącznie",
          alerts: "alertów",
          addTitle: "Dodaj nową część",
          editTitle: "Edytuj część",
          name: "Nazwa części",
          sku: "SKU",
          cancel: "Anuluj",
          save: "Zapisz",
          moveTitle: "Przenieś zapas",
          adjustTitle: "Korekta stanu",
          from: "Z",
          to: "Do",
          quantity: "Ilość",
          minimum: "Stan minimalny",
          unit: "Jednostka",
          deleteTitle: "Usunąć pozycję?",
          deleteText: "Tej operacji nie można cofnąć.",
          delete: "Usuń",
          adjust: "Korekta",
          history: "Ostatnie operacje",
          empty: "Brak pozycji spełniających kryteria",
          reason: "Powód",
          receive: "Dostawa",
          correction: "Korekta ręczna",
        }
      : {
          eyebrow: "STOCK OPERATIONS",
          title: "Parts inventory",
          sub: "Track stock across your Base and Truck.",
          add: "Add part",
          move: "Move stock",
          all: "All parts",
          low: "Low stock",
          out: "Out of stock",
          search: "Search by part name or SKU…",
          part: "PART",
          category: "CATEGORY",
          base: "BASE",
          truck: "TRUCK",
          total: "TOTAL",
          status: "STATUS",
          actions: "ACTIONS",
          inStock: "In stock",
          lowLabel: "Low stock",
          outLabel: "Out of stock",
          locations: "locations",
          units: "total units",
          alerts: "alerts",
          addTitle: "Add new part",
          editTitle: "Edit part",
          name: "Part name",
          sku: "SKU",
          cancel: "Cancel",
          save: "Save",
          moveTitle: "Move stock",
          adjustTitle: "Adjust stock",
          from: "From",
          to: "To",
          quantity: "Quantity",
          minimum: "Minimum stock",
          unit: "Unit",
          deleteTitle: "Delete this item?",
          deleteText: "This action cannot be undone.",
          delete: "Delete",
          adjust: "Adjust",
          history: "Recent operations",
          empty: "No parts match this filter",
          reason: "Reason",
          receive: "Delivery received",
          correction: "Manual correction",
        };
  const blank = {
    name: "",
    sku: "",
    category: "Other",
    base: 0,
    truck: 0,
    min: 2,
    unit: "pcs",
  };
  const [parts, setParts] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState(blank);
  const [selected, setSelected] = useState(null);
  const [transfer, setTransfer] = useState({
    partId: "",
    from: "base",
    qty: 1,
  });
  const [adjust, setAdjust] = useState({
    location: "base",
    delta: 1,
    reason: "receive",
  });
  const [history, setHistory] = useState([]);
  const [apiError, setApiError] = useState("");
  const canManage = ["owner", "manager"].includes(session.user.role);
  const canStock = ["owner", "manager", "mechanic"].includes(session.user.role);
  const api = async (path, options = {}) => {
    const r = await fetch(apiUrl(path), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
        ...options.headers,
      },
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      throw Error(d.error || "Request failed");
    }
    return r.status === 204 ? null : r.json();
  };
  const refresh = async () => {
    try {
      const [p, l] = await Promise.all([api("/parts"), api("/inventory/logs")]);
      setParts(p.parts);
      setHistory(
        l.logs.map((x, i) => ({
          id: i,
          text: x.description,
          time: new Date(x.created_at + "Z").toLocaleString(
            lang === "PL" ? "pl-PL" : "en-GB",
            {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            },
          ),
        })),
      );
      if (p.parts.length && !transfer.partId)
        setTransfer((t) => ({ ...t, partId: String(p.parts[0].id) }));
    } catch (e) {
      setApiError(e.message);
    }
  };
  useEffect(() => {
    refresh();
  }, []);
  const stockState = (p) =>
    p.base + p.truck === 0 ? "out" : p.base + p.truck <= p.min ? "low" : "ok";
  const visible = parts.filter(
    (p) =>
      (filter === "all" || stockState(p) === filter) &&
      (p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase())),
  );
  const alerts = parts.filter((p) => stockState(p) !== "ok").length;
  const total = parts.reduce((n, p) => n + p.base + p.truck, 0);
  const openAdd = () => {
    setDraft(blank);
    setSelected(null);
    setModal("edit");
  };
  const openEdit = (p) => {
    setDraft({ ...p });
    setSelected(p);
    setModal("edit");
  };
  const savePart = async () => {
    if (!draft.name.trim() || !draft.sku.trim()) return;
    try {
      await api(selected ? `/parts/${selected.id}` : "/parts", {
        method: selected ? "PUT" : "POST",
        body: JSON.stringify(draft),
      });
      setModal(null);
      await refresh();
    } catch (e) {
      setApiError(e.message);
    }
  };
  const confirmDelete = async () => {
    try {
      await api(`/parts/${selected.id}`, { method: "DELETE" });
      setModal(null);
      await refresh();
    } catch (e) {
      setApiError(e.message);
    }
  };
  const executeMove = async () => {
    try {
      await api(`/parts/${transfer.partId}/move`, {
        method: "POST",
        body: JSON.stringify({ from: transfer.from, qty: +transfer.qty }),
      });
      setModal(null);
      await refresh();
    } catch (e) {
      setApiError(e.message);
    }
  };
  const executeAdjust = async () => {
    try {
      await api(`/parts/${selected.id}/adjust`, {
        method: "POST",
        body: JSON.stringify({
          location: adjust.location,
          delta: +adjust.delta,
          reason: adjust.reason,
        }),
      });
      setModal(null);
      await refresh();
    } catch (e) {
      setApiError(e.message);
    }
  };
  const setField = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  return (
    <section className="inventoryPage">
      <div className="pageTitle">
        <div>
          <p className="eyebrow">{L.eyebrow}</p>
          <h1>{L.title}</h1>
          <p>{L.sub}</p>
        </div>
        <div className="titleActions">
          {canStock && (
            <button className="secondary" onClick={() => setModal("move")}>
              <ArrowRightLeft />
              {L.move}
            </button>
          )}
          {canManage && (
            <button className="primary" onClick={openAdd}>
              <PackagePlus />
              {L.add}
            </button>
          )}
        </div>
      </div>
      {apiError && (
        <div className="apiError" onClick={() => setApiError("")}>
          <AlertTriangle />
          {apiError}
          <X />
        </div>
      )}
      <div className="inventoryStats">
        <div>
          <span>
            <Warehouse />
          </span>
          <p>
            <b>2</b>
            <small>{L.locations}</small>
          </p>
        </div>
        <div>
          <span>
            <Boxes />
          </span>
          <p>
            <b>{total}</b>
            <small>{L.units}</small>
          </p>
        </div>
        <div className="alertStat">
          <span>
            <AlertTriangle />
          </span>
          <p>
            <b>{alerts}</b>
            <small>{L.alerts}</small>
          </p>
        </div>
      </div>
      <div className="inventoryTools">
        <div className="inventorySearch">
          <Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={L.search}
          />
        </div>
        <div className="filters">
          <SlidersHorizontal />
          <button
            className={filter === "all" ? "selected" : ""}
            onClick={() => setFilter("all")}
          >
            {L.all}
            <b>{parts.length}</b>
          </button>
          <button
            className={filter === "low" ? "selected" : ""}
            onClick={() => setFilter("low")}
          >
            {L.low}
            <b>{parts.filter((p) => stockState(p) === "low").length}</b>
          </button>
          <button
            className={filter === "out" ? "selected" : ""}
            onClick={() => setFilter("out")}
          >
            {L.out}
            <b>{parts.filter((p) => stockState(p) === "out").length}</b>
          </button>
        </div>
      </div>
      <div className="partsTable">
        <div className="tableHead">
          <span>{L.part}</span>
          <span>{L.category}</span>
          <span>{L.base}</span>
          <span>{L.truck}</span>
          <span>{L.total}</span>
          <span>{L.status}</span>
          <span>{L.actions}</span>
        </div>
        {visible.map((p) => {
          const s = stockState(p);
          return (
            <div className="partRow" key={p.id}>
              <div className="partName">
                <span className="partIcon">
                  <Boxes />
                </span>
                <p>
                  <strong>{p.name}</strong>
                  <small>{p.sku}</small>
                </p>
              </div>
              <span className="categoryTag">{p.category}</span>
              <span data-label={L.base}>
                <b>{p.base}</b> {p.unit}
              </span>
              <span data-label={L.truck}>
                <b>{p.truck}</b> {p.unit}
              </span>
              <span data-label={L.total} className="totalCell">
                <b>{p.base + p.truck}</b>
              </span>
              <span className={"stockState " + s}>
                <i />
                {s === "ok" ? L.inStock : s === "low" ? L.lowLabel : L.outLabel}
              </span>
              <div className="rowActions">
                {canStock && (
                  <button
                    aria-label={`Adjust ${p.name}`}
                    onClick={() => {
                      setSelected(p);
                      setAdjust({
                        location: "base",
                        delta: 1,
                        reason: "receive",
                      });
                      setModal("adjust");
                    }}
                  >
                    <PlusCircle />
                  </button>
                )}
                {canManage && (
                  <>
                    <button
                      aria-label={`Edit ${p.name}`}
                      onClick={() => openEdit(p)}
                    >
                      <Pencil />
                    </button>
                    <button
                      className="dangerIcon"
                      aria-label={`Delete ${p.name}`}
                      onClick={() => {
                        setSelected(p);
                        setModal("delete");
                      }}
                    >
                      <Trash2 />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
        {!visible.length && <div className="empty">{L.empty}</div>}
      </div>
      <div className="historyCard">
        <div className="cardHead">
          <h3>
            <History /> {L.history}
          </h3>
        </div>
        {history.map((h) => (
          <div className="historyRow" key={h.id}>
            <span />
            <p>
              {h.text}
              <small>
                <Clock3 /> {h.time}
              </small>
            </p>
          </div>
        ))}
      </div>
      {modal && (
        <div className="modalBackdrop" onClick={() => setModal(null)}>
          <div
            className={"modal " + (modal === "delete" ? "deleteModal" : "")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHead">
              <h2>
                {modal === "edit"
                  ? selected
                    ? L.editTitle
                    : L.addTitle
                  : modal === "move"
                    ? L.moveTitle
                    : modal === "adjust"
                      ? L.adjustTitle
                      : L.deleteTitle}
              </h2>
              <button aria-label="Close" onClick={() => setModal(null)}>
                <X />
              </button>
            </div>
            {modal === "edit" && (
              <div className="form">
                <label>
                  {L.name}
                  <input
                    value={draft.name}
                    onChange={(e) => setField("name", e.target.value)}
                    autoFocus
                  />
                </label>
                <div>
                  <label>
                    {L.sku}
                    <input
                      value={draft.sku}
                      disabled={!!selected}
                      onChange={(e) => setField("sku", e.target.value)}
                    />
                  </label>
                  <label>
                    {L.category}
                    <select
                      value={draft.category}
                      onChange={(e) => setField("category", e.target.value)}
                    >
                      {[
                        "Brakes",
                        "Drivetrain",
                        "Fluids",
                        "Tyres",
                        "Engine",
                        "Controls",
                        "Other",
                      ].map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    {L.base}
                    <input
                      type="number"
                      min="0"
                      value={draft.base}
                      onChange={(e) => setField("base", e.target.value)}
                    />
                  </label>
                  <label>
                    {L.truck}
                    <input
                      type="number"
                      min="0"
                      value={draft.truck}
                      onChange={(e) => setField("truck", e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    {L.minimum}
                    <input
                      type="number"
                      min="0"
                      value={draft.min}
                      onChange={(e) => setField("min", e.target.value)}
                    />
                  </label>
                  <label>
                    {L.unit}
                    <select
                      value={draft.unit}
                      onChange={(e) => setField("unit", e.target.value)}
                    >
                      <option>pcs</option>
                      <option>sets</option>
                      <option>tyres</option>
                      <option>bottles</option>
                      <option>litres</option>
                    </select>
                  </label>
                </div>
              </div>
            )}
            {modal === "move" && (
              <div className="form">
                <label>
                  {L.part}
                  <select
                    value={transfer.partId}
                    onChange={(e) =>
                      setTransfer({ ...transfer, partId: e.target.value })
                    }
                  >
                    {parts.map((p) => (
                      <option value={p.id} key={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div>
                  <label>
                    {L.from}
                    <select
                      value={transfer.from}
                      onChange={(e) =>
                        setTransfer({ ...transfer, from: e.target.value })
                      }
                    >
                      <option value="base">Base</option>
                      <option value="truck">Truck</option>
                    </select>
                  </label>
                  <label>
                    {L.to}
                    <input
                      value={transfer.from === "base" ? "Truck" : "Base"}
                      disabled
                    />
                  </label>
                </div>
                <label>
                  {L.quantity}
                  <input
                    type="number"
                    min="1"
                    value={transfer.qty}
                    onChange={(e) =>
                      setTransfer({ ...transfer, qty: e.target.value })
                    }
                  />
                </label>
              </div>
            )}
            {modal === "adjust" && (
              <div className="form">
                <div>
                  <label>
                    {L.part}
                    <input value={selected?.name || ""} disabled />
                  </label>
                  <label>
                    {L.from}
                    <select
                      value={adjust.location}
                      onChange={(e) =>
                        setAdjust({ ...adjust, location: e.target.value })
                      }
                    >
                      <option value="base">Base</option>
                      <option value="truck">Truck</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    {L.quantity}
                    <input
                      type="number"
                      value={adjust.delta}
                      onChange={(e) =>
                        setAdjust({ ...adjust, delta: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    {L.reason}
                    <select
                      value={adjust.reason}
                      onChange={(e) =>
                        setAdjust({ ...adjust, reason: e.target.value })
                      }
                    >
                      <option value="receive">{L.receive}</option>
                      <option value="correction">{L.correction}</option>
                    </select>
                  </label>
                </div>
              </div>
            )}
            {modal === "delete" && (
              <div className="deleteContent">
                <span>
                  <Trash2 />
                </span>
                <p>
                  <strong>{selected?.name}</strong>
                  {L.deleteText}
                </p>
              </div>
            )}
            <div className="modalActions">
              <button className="secondary" onClick={() => setModal(null)}>
                {L.cancel}
              </button>
              <button
                className={modal === "delete" ? "dangerButton" : "primary"}
                onClick={
                  modal === "edit"
                    ? savePart
                    : modal === "move"
                      ? executeMove
                      : modal === "adjust"
                        ? executeAdjust
                        : confirmDelete
                }
              >
                {modal === "delete"
                  ? L.delete
                  : modal === "move"
                    ? L.move
                    : modal === "adjust"
                      ? L.adjust
                      : L.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
function Metric({ label, value, suffix, progress, warn, accent }) {
  return (
    <div className={"metric " + (accent ? "metricAccent" : "")}>
      <span>{label}</span>
      <div>
        <b>{value}</b>
        <small className={warn ? "warn" : ""}>{suffix}</small>
      </div>
      {progress && (
        <div className="bar">
          <i style={{ width: progress + "%" }} />
        </div>
      )}
    </div>
  );
}
function Card({ title, action, onAction, children }) {
  return (
    <article className="card">
      <div className="cardHead">
        <h3>{title}</h3>
        {action && (
          <button onClick={onAction}>
            {action}
            <ArrowUpRight size={15} />
          </button>
        )}
      </div>
      {children}
    </article>
  );
}
function Status({ label, value, percent }) {
  return (
    <div className="status">
      <div>
        <span>{label}</span>
        <b>{value}</b>
      </div>
      <div className="bar">
        <i style={{ width: percent + "%" }} />
      </div>
    </div>
  );
}
function Task({ title, meta, tag }) {
  return (
    <div className="task">
      <button className="check" />
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      <span>{tag}</span>
      <ChevronRight size={17} />
    </div>
  );
}
function Location({ icon: I, name, count, t }) {
  return (
    <div className="location">
      <I />
      <div>
        <b>{count}</b>
        <span>
          {name} · {t.items}
        </span>
      </div>
    </div>
  );
}
function Stock({ name, count }) {
  return (
    <div>
      <span>{name}</span>
      <b>
        {count} <small>IN STOCK</small>
      </b>
    </div>
  );
}
function Activity({ icon: I, text, time }) {
  return (
    <div>
      <span className="activityIcon">
        <I />
      </span>
      <p>
        {text}
        <small>
          <Clock3 /> {time} ago
        </small>
      </p>
    </div>
  );
}
function EmptyOverview({icon:I,text}){
  return <div className="emptyOverview"><I/><span>{text}</span></div>;
}
createRoot(document.getElementById("root")).render(<App />);
