// src/pages/Notifications.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  Search,
  Filter,
  CheckCheck,
  Trash2,
  Bell,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  X,
} from "lucide-react";

const LS_NOTIF_VIEW = "notif_view_mode_v1"; // "loadmore" | "pagination"
const LS_NOTIF_PAGE_SIZE = "notif_page_size_v1";

const safeStr = (v) => (v ?? "").toString();

const formatRelative = (iso) => {
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

  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const typeBadge = (type) => {
  const t = safeStr(type).toLowerCase();
  if (t === "task")
    return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200";
  if (t === "leave")
    return "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-200";
  if (t === "payroll")
    return "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200";
  if (t === "attendance")
    return "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200";
  if (t === "shift")
    return "bg-indigo-50 text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-200";
  if (t === "todo")
    return "bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-200";
  return "bg-gray-50 text-gray-700 dark:bg-white/5 dark:text-gray-200";
};

const SkeletonRow = () => (
  <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-4">
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-1/3 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

const Notifications = () => {
  const {
    navigate,
    userNotifications,
    unreadCount,
    markNotificationOpened,
    markAllNotificationsOpened,
    deleteNotification,
    clearMyNotifications,
  } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all"); // all | unread
  const [selectedId, setSelectedId] = useState(null); // desktop detail
  const [expandedId, setExpandedId] = useState(null); // mobile expand

  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem(LS_NOTIF_VIEW) || "loadmore";
  });

  const [pageSize, setPageSize] = useState(() => {
    const raw = localStorage.getItem(LS_NOTIF_PAGE_SIZE);
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : 8;
  });

  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_NOTIF_VIEW, viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem(LS_NOTIF_PAGE_SIZE, String(pageSize));
  }, [pageSize]);

  useEffect(() => {
    if (!userNotifications?.length) {
      setSelectedId(null);
      return;
    }
    if (!selectedId) setSelectedId(userNotifications[0].id);
  }, [userNotifications, selectedId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = userNotifications || [];
    if (tab === "unread") list = list.filter((n) => !n.opened);

    if (!q) return list;

    return list.filter((n) => {
      const hay = [n.title, n.message, n.senderName, n.type, n.redirectPath]
        .map((x) => safeStr(x).toLowerCase())
        .join(" ");
      return hay.includes(q);
    });
  }, [userNotifications, query, tab]);

  const shown = useMemo(() => {
    if (viewMode === "pagination") {
      const start = (page - 1) * pageSize;
      return filtered.slice(start, start + pageSize);
    }
    return filtered.slice(0, visibleCount);
  }, [filtered, viewMode, page, pageSize, visibleCount]);

  const totalPages = useMemo(() => {
    if (viewMode !== "pagination") return 1;
    return Math.max(1, Math.ceil(filtered.length / pageSize));
  }, [filtered.length, viewMode, pageSize]);

  useEffect(() => {
    setPage(1);
    setVisibleCount(8);
  }, [query, tab, viewMode, pageSize]);

  const selected = useMemo(() => {
    return (userNotifications || []).find((n) => n.id === selectedId) || null;
  }, [userNotifications, selectedId]);

  const openNotification = (n) => {
    if (!n) return;
    if (!n.opened) markNotificationOpened(n.id, true);
    if (n.redirectPath) navigate(n.redirectPath);
  };

  const EmptyState = () => (
    <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-8 text-center">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-gray-50 dark:bg-white/5 grid place-items-center">
        <Bell className="w-6 h-6 text-gray-500 dark:text-gray-300" />
      </div>
      <div className="mt-3 text-lg font-bold">No notifications</div>
      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        You don’t have any notifications in this view.
      </div>
      {tab === "unread" && (
        <button
          onClick={() => setTab("all")}
          className="mt-4 h-10 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
        >
          Show all
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Desktop-only header + controls */}
      <div className="hidden lg:block space-y-4">
        <div className="flex items-start md:items-center justify-between gap-3">
          <div>
            <div className="text-xl font-bold">My Notifications</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {unreadCount} unread • {userNotifications?.length || 0} total
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => markAllNotificationsOpened(true)}
              disabled={!userNotifications?.length}
              className={`h-10 px-3 rounded-xl border text-sm font-semibold inline-flex items-center gap-2 transition
                ${
                  userNotifications?.length
                    ? "border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5"
                    : "border-gray-200/60 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                }`}
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
              Read all
            </button>

            <button
              onClick={() => clearMyNotifications()}
              disabled={!userNotifications?.length}
              className={`h-10 px-3 rounded-xl border text-sm font-semibold inline-flex items-center gap-2 transition
                ${
                  userNotifications?.length
                    ? "border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-500/15"
                    : "border-gray-200/60 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                }`}
              title="Clear all notifications"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full h-10 pl-9 pr-10 rounded-xl text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-primary/20"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 grid place-items-center"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex p-1 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <button
                  onClick={() => setTab("all")}
                  className={`h-8 px-3 rounded-lg text-sm font-semibold transition ${
                    tab === "all"
                      ? "bg-white dark:bg-[#0b1016] shadow-sm"
                      : "text-gray-500 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTab("unread")}
                  className={`h-8 px-3 rounded-lg text-sm font-semibold transition ${
                    tab === "unread"
                      ? "bg-white dark:bg-[#0b1016] shadow-sm"
                      : "text-gray-500 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  Unread
                </button>
              </div>

              <button
                onClick={() =>
                  setViewMode((m) => (m === "loadmore" ? "pagination" : "loadmore"))
                }
                className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition inline-flex items-center gap-2 text-sm font-semibold"
                title="Toggle pagination mode"
              >
                <Filter className="w-4 h-4" />
                {viewMode === "loadmore" ? "Load more" : "Pages"}
              </button>

              {viewMode === "pagination" ? (
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
                  title="Items per page"
                >
                  {[6, 8, 10, 12, 16].map((n) => (
                    <option key={n} value={n}>
                      {n}/page
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/iPad compact controls */}
      <div className="lg:hidden rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-sm font-bold">Notifications</div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              {unreadCount} unread • {userNotifications?.length || 0} total
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => markAllNotificationsOpened(true)}
              disabled={!userNotifications?.length}
              className={`h-10 w-10 rounded-xl border grid place-items-center transition ${
                userNotifications?.length
                  ? "border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5"
                  : "border-gray-200/60 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
              }`}
              title="Read all"
              aria-label="Read all"
            >
              <CheckCheck className="w-4 h-4" />
            </button>

            <button
              onClick={() => clearMyNotifications()}
              disabled={!userNotifications?.length}
              className={`h-10 w-10 rounded-xl border grid place-items-center transition ${
                userNotifications?.length
                  ? "border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-500/15"
                  : "border-gray-200/60 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
              }`}
              title="Clear"
              aria-label="Clear"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full h-10 pl-9 pr-10 rounded-xl text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-primary/20"
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 grid place-items-center"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            ) : null}
          </div>

          <button
            onClick={() => setTab((t) => (t === "all" ? "unread" : "all"))}
            className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold"
            title="Toggle unread"
          >
            {tab === "all" ? "Unread" : "All"}
          </button>
        </div>
      </div>

      {/* ✅ RESPONSIVE FIX:
          - 2-column master/detail only from xl (>=1280)
          - from lg to xl (1024–1279): single column so detail card never overflows
      */}
      <div className="grid grid-cols-1 xl:grid-cols-[420px_minmax(0,1fr)] gap-4">
        {/* Left list */}
        <div className="space-y-3">
          {loading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : shown.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {shown.map((n) => {
                const isSelected = n.id === selectedId;
                const isExpanded = n.id === expandedId;

                return (
                  <div
                    key={n.id}
                    className={`rounded-2xl border bg-white dark:bg-[#0b1016] transition
                      ${
                        !n.opened
                          ? "border-primary/30 shadow-[0_10px_30px_-22px_rgba(237,41,38,0.45)]"
                          : "border-gray-100 dark:border-white/10"
                      }`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setSelectedId(n.id);
                        setExpandedId((prev) => (prev === n.id ? null : n.id));
                        if (!n.opened) markNotificationOpened(n.id, true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedId(n.id);
                          setExpandedId((prev) => (prev === n.id ? null : n.id));
                          if (!n.opened) markNotificationOpened(n.id, true);
                        }
                      }}
                      className="w-full p-4 text-left cursor-pointer select-none"
                      aria-label="Open notification"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-white/5 grid place-items-center shrink-0">
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                            {(safeStr(n.senderName).trim()[0] || "N").toUpperCase()}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                {!n.opened ? (
                                  <span className="h-2 w-2 rounded-full bg-primary" />
                                ) : (
                                  <span className="h-2 w-2 rounded-full bg-transparent" />
                                )}
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                  {n.title || "Notification"}
                                </p>
                              </div>

                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                                From: {n.senderName || "System"} • {formatRelative(n.createdAt)}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {n.type ? (
                                <span className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${typeBadge(n.type)}`}>
                                  {safeStr(n.type).toUpperCase()}
                                </span>
                              ) : null}

                              <span className="xl:hidden">
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                              </span>
                            </div>
                          </div>

                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200 line-clamp-2">
                            {n.message || "—"}
                          </p>

                          {/* mobile/tablet expandable detail (below xl) */}
                          <div className={`xl:hidden ${isExpanded ? "mt-3" : "hidden"}`}>
                            <div className="rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3">
                              <div className="text-xs text-gray-500 dark:text-gray-400">Redirect:</div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white break-all">
                                {n.redirectPath || "—"}
                              </div>

                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markNotificationOpened(n.id, n.opened ? false : true);
                                  }}
                                  className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold inline-flex items-center gap-2"
                                  title={n.opened ? "Mark as unread" : "Mark as read"}
                                >
                                  <CheckCheck className="w-4 h-4" />
                                  {n.opened ? "Unread" : "Read"}
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openNotification(n);
                                  }}
                                  className="h-10 px-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition inline-flex items-center gap-2"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Open
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(n.id);
                                  }}
                                  className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold inline-flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className={`hidden xl:block mt-2 ${isSelected ? "" : "hidden"}`}>
                            <div className="text-[11px] text-primary font-semibold">Selected</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {viewMode === "loadmore" ? (
                <div className="pt-1">
                  {visibleCount < filtered.length ? (
                    <button
                      type="button"
                      onClick={() => setVisibleCount((v) => Math.min(v + 8, filtered.length))}
                      className="w-full h-11 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold"
                    >
                      Load more ({Math.min(visibleCount, filtered.length)}/{filtered.length})
                    </button>
                  ) : filtered.length > 0 ? (
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-2">
                      You’re all caught up.
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className={`h-10 px-3 rounded-xl border text-sm font-semibold transition ${
                      page <= 1
                        ? "border-gray-200/60 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                        : "border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    Prev
                  </button>

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Page <span className="font-semibold">{page}</span> / {totalPages}
                  </div>

                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className={`h-10 px-3 rounded-xl border text-sm font-semibold transition ${
                      page >= totalPages
                        ? "border-gray-200/60 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                        : "border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right detail (xl+ only) */}
        <div className="hidden xl:block min-w-0">
          {loading ? (
            <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-6 space-y-3">
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
              <div className="h-24 w-full bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
              <div className="h-10 w-44 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
            </div>
          ) : !selected ? (
            <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-8 text-center">
              <div className="text-lg font-bold">Select a notification</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Choose a notification from the list to see details.
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-6 xl:sticky xl:top-4 min-w-0 overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {!selected.opened ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
                    <div className="text-lg font-bold text-gray-900 dark:text-white truncate">
                      {selected.title || "Notification"}
                    </div>
                  </div>

                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    From <span className="font-semibold">{selected.senderName || "System"}</span> •{" "}
                    {formatRelative(selected.createdAt)}
                  </div>

                  {selected.type ? (
                    <div className="mt-3">
                      <span className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${typeBadge(selected.type)}`}>
                        {safeStr(selected.type).toUpperCase()}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => markNotificationOpened(selected.id, !selected.opened)}
                    className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold inline-flex items-center gap-2"
                    title={selected.opened ? "Mark as unread" : "Mark as read"}
                  >
                    <CheckCheck className="w-4 h-4" />
                    {selected.opened ? "Unread" : "Read"}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteNotification(selected.id)}
                    className="h-10 px-3 rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-500/15 transition text-sm font-semibold inline-flex items-center gap-2"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4 min-w-0">
                <div className="text-xs text-gray-500 dark:text-gray-400">Message</div>
                <div className="mt-1 text-sm text-gray-900 dark:text-white leading-relaxed whitespace-pre-line break-words">
                  {selected.message || "—"}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Redirect Path</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white break-all">
                      {selected.redirectPath || "—"}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Status</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {selected.opened ? "Opened" : "Unread"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openNotification(selected)}
                    className="h-11 px-4 rounded-2xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open target
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
