// src/pages/Feeds.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  CalendarDays,
  Clock,
  FileText,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import EventFormModal from "../components/EventFormModal";

const safeStr = (v) => (v ?? "").toString();

const formatRelative = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;

  const min = Math.floor(diffMs / 60000);
  const hr = Math.floor(diffMs / 3600000);
  const day = Math.floor(diffMs / 86400000);

  if (min < 1) return "Just now";
  if (min < 60) return `${min} min ago`;
  if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`;
  if (day < 7) return `${day} day${day === 1 ? "" : "s"} ago`;

  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
};

const toDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const todayKey = () => toDateKey(new Date());

const startOfMonthGrid = (y, m) => {
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);

  // Monday start
  const firstDow = first.getDay() === 0 ? 7 : first.getDay(); // Mon=1..Sun=7
  const leading = firstDow - 1;

  const days = [];
  for (let i = 0; i < leading; i++) days.push(null);
  for (let day = 1; day <= last.getDate(); day++) days.push(new Date(y, m, day));
  while (days.length % 7 !== 0) days.push(null);

  return { first, last, days };
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const Feeds = () => {
  const { navigate, userData, sortedFeeds, userEvents, addEvent } = useAppContext();
  const currentEmployeeId = userData?.id || null;

  const [tab, setTab] = useState("feeds"); // feeds | events
  const [loading, setLoading] = useState(true);

  // Events UI
  const minDate = useMemo(() => todayKey(), []);
  const [selectedDate, setSelectedDate] = useState(() => minDate);

  // Month/Year controls
  const now = useMemo(() => new Date(), []);
  const [viewMode, setViewMode] = useState("month"); // day | week | month (UI only)
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());

  // Modal
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventDraft, setEventDraft] = useState(null); // { date }

  // Filters (like your screenshot)
  const filterDefs = useMemo(
    () => [
      { key: "Work Orders", pill: "bg-red-50 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-200" },
      { key: "Move-Ins", pill: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-200" },
      { key: "Move-Outs", pill: "bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-200" },
      { key: "Notes", pill: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-200" },
    ],
    []
  );

  const [filters, setFilters] = useState(() => ({
    "Work Orders": true,
    "Move-Ins": true,
    "Move-Outs": true,
    "Notes": true,
  }));

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 280);
    return () => clearTimeout(t);
  }, []);

  const feedList = useMemo(() => (sortedFeeds || []).slice(), [sortedFeeds]);

  const eventsByDate = useMemo(() => {
    const map = new Map();
    (userEvents || []).forEach((ev) => {
      const k = ev.date;
      if (!k) return;
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(ev);
    });

    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
      map.set(k, arr);
    }
    return map;
  }, [userEvents]);

  const isPastKey = (dateKey) => dateKey < minDate;

  const getNextEventId = (list) => {
    const max = (list || []).reduce((acc, ev) => {
      const m = safeStr(ev.id).match(/EVT-(\d+)/i);
      return m ? Math.max(acc, parseInt(m[1], 10)) : acc;
    }, 0);
    return `EVT-${String(max + 1).padStart(6, "0")}`;
  };

  const openCreateForDate = (dateKey) => {
    if (!dateKey || isPastKey(dateKey)) return;
    setEventDraft({ date: dateKey });
    setEventModalOpen(true);
  };

  const createEventSubmit = (payload) => {
    const nowIso = new Date().toISOString();
    const id = getNextEventId(userEvents || []);

    if (!payload?.date) return;
    if (payload.date < minDate) return alert("You cannot create events in past days.");

    addEvent({
      id,
      employeeId: currentEmployeeId, // ✅ self only (from context)
      title: payload.title,
      date: payload.date,
      time: payload.time || "",
      category: payload.category || "Notes",
      createdAt: nowIso,
    });

    setSelectedDate(payload.date);
    setEventModalOpen(false);
  };

  // Build big month grid
  const monthGrid = useMemo(() => {
    const { days } = startOfMonthGrid(year, month);
    const title = `${monthNames[month]} ${year}`;
    return { days, title };
  }, [month, year]);

  // Mini calendar (same month/year, smaller)
  const mini = useMemo(() => {
    const { days } = startOfMonthGrid(year, month);
    return { days };
  }, [month, year]);

  const monthHasEvents = (dateKey) => {
    const arr = eventsByDate.get(dateKey) || [];
    const visible = arr.filter((e) => {
      const cat = e.category || "Notes";
      return !!filters[cat];
    });
    return visible.length > 0;
  };

  const visibleEventsForDate = (dateKey) => {
    const arr = eventsByDate.get(dateKey) || [];
    return arr.filter((e) => {
      const cat = e.category || "Notes";
      return !!filters[cat];
    });
  };

  const pillClassForCategory = (cat) => {
    const hit = filterDefs.find((x) => x.key === cat);
    return hit?.pill || filterDefs[3].pill; // fallback Notes
  };

  const clampToNowMonth = () => {
    const d = new Date();
    setYear(d.getFullYear());
    setMonth(d.getMonth());
    setSelectedDate(minDate);
  };

  const goPrevMonth = () => {
    const next = new Date(year, month - 1, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };

  const goNextMonth = () => {
    const next = new Date(year, month + 1, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };

  const yearOptions = useMemo(() => {
    const base = new Date().getFullYear();
    // show a clean range like UI designs
    return Array.from({ length: 8 }, (_, i) => base - 1 + i); // (base-1) .. (base+6)
  }, []);

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/")}>
          Dashboard
        </span>{" "}
        /{" "}
        <span className="font-medium text-gray-900 dark:text-white">Feeds</span>
      </div>

      {/* Header + Tabs (keep your style) */}
      <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xl font-bold">Community</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {tab === "feeds" ? `${(feedList || []).length} posts` : `${(userEvents || []).length} events`} • Logged in as{" "}
              {userData?.firstName || "User"}
            </div>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            <button
              onClick={() => setTab("feeds")}
              className={`h-9 px-4 rounded-lg text-sm font-semibold transition ${
                tab === "feeds"
                  ? "bg-white dark:bg-[#0b1016] shadow-sm"
                  : "text-gray-500 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10"
              }`}
            >
              Feeds
            </button>
            <button
              onClick={() => setTab("events")}
              className={`h-9 px-4 rounded-lg text-sm font-semibold transition ${
                tab === "events"
                  ? "bg-white dark:bg-[#0b1016] shadow-sm"
                  : "text-gray-500 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10"
              }`}
            >
              Events
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- FEEDS TAB ---------------- */}
      {tab === "feeds" ? (
        <div className="space-y-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-4 h-40 animate-pulse" />
              <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-4 h-40 animate-pulse" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(feedList || []).map((f) => {
                const att = f.attachment;
                const hasImage = att?.type === "image" && att?.url;
                const hasDoc = att?.type === "doc" && att?.url;

                return (
                  <div
                    key={f.id}
                    className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-white/5 grid place-items-center shrink-0">
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                              {(safeStr(f.creatorName).trim()[0] || "A").toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 dark:text-white truncate">
                              {f.creatorName || "Admin"}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {formatRelative(f.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                        {f.content || "—"}
                      </div>

                      {hasImage ? (
                        <div className="mt-3 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10">
                          <img src={att.url} alt={att.name || "attachment"} className="w-full h-64 object-cover" />
                        </div>
                      ) : null}

                      {hasDoc ? (
                        <a
                          href={att.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold"
                        >
                          <FileText className="w-4 h-4" />
                          {att.name || "Open document"}
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : null}

      {/* ---------------- EVENTS TAB ---------------- */}
      {tab === "events" ? (
        <div className="space-y-4">
          {/* Calendar header like screenshot */}
          <div className="border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] rounded-md">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</div>
              </div>

              <div className="flex flex-wrap items-center gap-2 justify-between lg:justify-end">
                {/* View mode (UI like screenshot) */}
                <div className="inline-flex border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-md overflow-hidden">
                  {["Day", "Week", "Month"].map((v) => {
                    const key = v.toLowerCase();
                    const active = viewMode === key;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setViewMode(key)}
                        className={`h-9 px-4 text-sm font-semibold border-r last:border-r-0 border-gray-200 dark:border-white/10 ${
                          active
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "text-gray-700 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-white/10"
                        }`}
                        title="UI toggle"
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>

                {/* Add Event */}
                <button
                  onClick={() => openCreateForDate(selectedDate)}
                  disabled={isPastKey(selectedDate)}
                  className={`h-9 px-4 rounded-md text-sm font-semibold inline-flex items-center gap-2 transition ${
                    isPastKey(selectedDate)
                      ? "bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add Event
                </button>
              </div>
            </div>

            {/* Main body */}
            <div className="grid grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)_360px]">
              {/* LEFT SIDEBAR: Filters + mini calendar */}
              <div className="border-b xl:border-b-0 xl:border-r border-gray-200 dark:border-white/10 p-4">
                <div className="text-sm font-bold text-gray-900 dark:text-white">Filters</div>

                <div className="mt-3 space-y-2">
                  {filterDefs.map((f) => (
                    <label key={f.key} className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                      <input
                        type="checkbox"
                        checked={!!filters[f.key]}
                        onChange={(e) => setFilters((p) => ({ ...p, [f.key]: e.target.checked }))}
                        className="h-4 w-4"
                      />
                      <span className="inline-flex items-center gap-2">
                        <span className={`h-4 w-4 border ${f.pill} inline-block`} />
                        {f.key}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Mini calendar */}
                <div className="mt-6">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {monthNames[month]} {year}
                  </div>
                  <div className="mt-2 grid grid-cols-7 gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                      <div key={d} className="text-center py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {mini.days.map((d, idx) => {
                      if (!d) return <div key={`mini-b-${idx}`} className="h-7" />;
                      const k = toDateKey(d);
                      const selected = k === selectedDate;
                      const past = isPastKey(k);
                      const dot = monthHasEvents(k);

                      return (
                        <button
                          key={`mini-${k}`}
                          disabled={past}
                          onClick={() => setSelectedDate(k)}
                          className={`h-7 border text-[11px] font-semibold relative ${
                            past
                              ? "opacity-40 cursor-not-allowed bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"
                              : selected
                              ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                              : "bg-white dark:bg-[#0b1016] border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
                          }`}
                        >
                          {d.getDate()}
                          {dot ? (
                            <span
                              className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 ${
                                selected ? "bg-white dark:bg-black" : "bg-primary"
                              }`}
                            />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={clampToNowMonth}
                  className="mt-5 h-9 px-3 w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-semibold rounded-md"
                >
                  Jump to Today
                </button>
              </div>

              {/* CENTER: Big Month Calendar */}
              <div className="min-w-0 border-b xl:border-b-0 xl:border-r border-gray-200 dark:border-white/10">
                {/* Month controls like screenshot */}
                <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {monthGrid.title}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* month/year quick change */}
                    <select
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                      className="h-9 px-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm rounded-md outline-none"
                    >
                      {monthNames.map((name, idx) => (
                        <option key={name} value={idx}>
                          {name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="h-9 px-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm rounded-md outline-none"
                    >
                      {yearOptions.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={goPrevMonth}
                      className="h-9 w-9 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 rounded-md grid place-items-center"
                      aria-label="Prev month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goNextMonth}
                      className="h-9 w-9 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 rounded-md grid place-items-center"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Weekday header */}
                <div className="grid grid-cols-7 border-b border-gray-200 dark:border-white/10">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div
                      key={d}
                      className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 border-r last:border-r-0 border-gray-200 dark:border-white/10"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Month grid (boxy cells) */}
                <div className="grid grid-cols-7">
                  {monthGrid.days.map((d, idx) => {
                    const isBlank = !d;
                    const k = isBlank ? `blank-${idx}` : toDateKey(d);
                    const selected = !isBlank && k === selectedDate;
                    const past = !isBlank && isPastKey(k);
                    const visibleEvents = !isBlank ? visibleEventsForDate(k) : [];
                    const showEvents = visibleEvents.slice(0, 3);
                    const more = Math.max(0, visibleEvents.length - showEvents.length);

                    return (
                      <button
                        key={k}
                        disabled={isBlank || past}
                        onClick={() => {
                          if (isBlank || past) return;
                          setSelectedDate(k);
                        }}
                        className={`min-h-[110px] md:min-h-[130px] border-r border-b border-gray-200 dark:border-white/10 p-2 text-left relative ${
                          isBlank
                            ? "bg-white dark:bg-[#0b1016]"
                            : past
                            ? "bg-gray-50 dark:bg-white/5 opacity-60 cursor-not-allowed"
                            : selected
                            ? "bg-primary/10 dark:bg-white/5"
                            : "bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                        title={isBlank ? "" : k}
                      >
                        {isBlank ? null : (
                          <>
                            <div className="flex items-center justify-between">
                              <div
                                className={`text-sm font-bold ${
                                  selected ? "text-primary dark:text-white" : "text-gray-900 dark:text-white"
                                }`}
                              >
                                {d.getDate()}
                              </div>

                              {monthHasEvents(k) ? (
                                <span className="h-2 w-2 bg-primary inline-block" />
                              ) : null}
                            </div>

                            {/* events inside cell (overall view) */}
                            <div className="mt-2 space-y-1">
                              {showEvents.map((ev) => {
                                const cat = ev.category || "Notes";
                                return (
                                  <div
                                    key={ev.id}
                                    className={`px-2 py-1 border text-[11px] font-semibold truncate ${pillClassForCategory(
                                      cat
                                    )}`}
                                    title={`${ev.time ? ev.time + " • " : ""}${ev.title}`}
                                  >
                                    {ev.time ? `${ev.time} ` : ""}
                                    {ev.title}
                                  </div>
                                );
                              })}

                              {more > 0 ? (
                                <div className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold">
                                  +{more} more
                                </div>
                              ) : null}
                            </div>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT: Selected Day panel (desktop), Mobile will show below */}
              <div className="p-4 hidden xl:block">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">Selected</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{selectedDate}</div>
                  </div>
                  <button
                    onClick={() => openCreateForDate(selectedDate)}
                    disabled={isPastKey(selectedDate)}
                    className={`h-9 px-3 rounded-md text-sm font-semibold inline-flex items-center gap-2 transition ${
                      isPastKey(selectedDate)
                        ? "bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  {visibleEventsForDate(selectedDate).map((ev) => (
                    <div
                      key={ev.id}
                      className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3"
                    >
                      <div className="text-sm font-bold text-gray-900 dark:text-white truncate">{ev.title}</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {ev.time ? ev.time : "No time"}
                      </div>
                      <div className="mt-2">
                        <span className={`inline-flex px-2 py-1 border text-[11px] font-semibold ${pillClassForCategory(ev.category || "Notes")}`}>
                          {ev.category || "Notes"}
                        </span>
                      </div>
                    </div>
                  ))}

                  {visibleEventsForDate(selectedDate).length === 0 ? (
                    <div className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 text-center">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">No events</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Create an event for this day.
                      </div>
                      <button
                        onClick={() => openCreateForDate(selectedDate)}
                        disabled={isPastKey(selectedDate)}
                        className={`mt-4 h-9 px-3 rounded-md text-sm font-semibold inline-flex items-center gap-2 transition ${
                          isPastKey(selectedDate)
                            ? "bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-primary/90"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                        Add Event
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* MOBILE selected panel (shows under calendar) */}
            <div className="xl:hidden border-t border-gray-200 dark:border-white/10 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Selected</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{selectedDate}</div>
                </div>
                <button
                  onClick={() => openCreateForDate(selectedDate)}
                  disabled={isPastKey(selectedDate)}
                  className={`h-9 px-3 rounded-md text-sm font-semibold inline-flex items-center gap-2 transition ${
                    isPastKey(selectedDate)
                      ? "bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {visibleEventsForDate(selectedDate).slice(0, 6).map((ev) => (
                  <div
                    key={ev.id}
                    className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3"
                  >
                    <div className="text-sm font-bold text-gray-900 dark:text-white truncate">{ev.title}</div>
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {ev.time ? ev.time : "No time"}
                    </div>
                  </div>
                ))}

                {visibleEventsForDate(selectedDate).length === 0 ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400">No events for this day.</div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Modal */}
          <EventFormModal
            open={eventModalOpen}
            onClose={() => setEventModalOpen(false)}
            onSubmit={createEventSubmit}
            initial={{
              title: "",
              date: eventDraft?.date || selectedDate,
              time: "",
              category: "Notes",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Feeds;
