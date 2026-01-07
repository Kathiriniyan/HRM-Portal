// src/pages/Tasks.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  Search,
  Filter,
  CheckCheck,
  Trash2,
  ClipboardList,
  ChevronRight,
  ChevronDown,
  X,
  Circle,
  BarChart3,
  Calendar,
  Users,
  Pencil,
  Plus,
} from "lucide-react";
import TaskFormModal from "../components/TaskFormModal";

const LS_TASK_VIEW = "task_view_mode_v1"; // "loadmore" | "pagination"
const LS_TASK_PAGE_SIZE = "task_page_size_v1";

const safeStr = (v) => (v ?? "").toString();
const norm = (v) => safeStr(v).trim().toLowerCase();

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

const statusBadge = (status) => {
  const s = norm(status);
  if (s === "completed") return "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200";
  if (s === "overdue") return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-200";
  if (s === "working") return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200";
  if (s === "review") return "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200";
  if (s === "pending") return "bg-gray-50 text-gray-700 dark:bg-white/5 dark:text-gray-200";
  if (s === "canceled") return "bg-zinc-50 text-zinc-700 dark:bg-white/5 dark:text-zinc-200";
  if (s === "transferred") return "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-200";
  return "bg-gray-50 text-gray-700 dark:bg-white/5 dark:text-gray-200";
};

const priorityBadge = (priority) => {
  const p = norm(priority);
  if (p === "high") return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-200";
  if (p === "medium") return "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200";
  return "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200";
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

const getNextTaskId = (list) => {
  const max = (list || []).reduce((acc, t) => {
    const m = safeStr(t.id).match(/TASK-(\d+)/i);
    return m ? Math.max(acc, parseInt(m[1], 10)) : acc;
  }, 0);
  return `TASK-${String(max + 1).padStart(3, "0")}`;
};

const Tasks = () => {
  const {
    navigate,
    userData,
    currentEmployeeId,
    employees,
    tasks,
    projects,
    addTask,
    updateTask,
    deleteTask,
  } = useAppContext();

  const isHR = !!userData?.isHR;
  const allEmployees = employees || [];

  const [loading, setLoading] = useState(true);

  // filters
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all"); // all | open | completed
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");

  // selection (NO auto-select)
  const [selectedId, setSelectedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // viewMode + paging
  const [viewMode, setViewMode] = useState(() => localStorage.getItem(LS_TASK_VIEW) || "loadmore");
  const [pageSize, setPageSize] = useState(() => {
    const raw = localStorage.getItem(LS_TASK_PAGE_SIZE);
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : 8;
  });

  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(8);

  // modals
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const sentinelRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => localStorage.setItem(LS_TASK_VIEW, viewMode), [viewMode]);
  useEffect(() => localStorage.setItem(LS_TASK_PAGE_SIZE, String(pageSize)), [pageSize]);

  const employeeName = (id) => {
    const e = (allEmployees || []).find((x) => x.id === id);
    if (!e) return id || "—";
    return `${safeStr(e.firstName)} ${safeStr(e.lastName)}`.trim() || e.id || "—";
  };

  const projectName = (projectId) => {
    const p = (projects || []).find((x) => x.id === projectId);
    return p?.name || projectId || "—";
  };

  // base list
  const baseList = useMemo(() => {
    const all = (tasks || []).slice();

    // HR sees all tasks, normal user sees only assigned to them
    const list = isHR
      ? all
      : all.filter((t) => (t.assignedEmployees || []).includes(currentEmployeeId));

    return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [tasks, isHR, currentEmployeeId]);

  const filtered = useMemo(() => {
    const q = norm(query);
    let list = baseList.slice();

    if (tab === "open") list = list.filter((t) => norm(t.status) !== "completed" && norm(t.status) !== "canceled");
    if (tab === "completed") list = list.filter((t) => norm(t.status) === "completed");

    if (status !== "all") list = list.filter((t) => norm(t.status) === norm(status));
    if (priority !== "all") list = list.filter((t) => norm(t.priority) === norm(priority));

    if (!q) return list;

    return list.filter((t) => {
      const p = (projects || []).find((x) => x.id === t.projectId);
      const hay = [
        t.id,
        t.subject,
        t.detail,
        t.status,
        t.priority,
        t.projectId,
        p?.name,
        ...(t.assignedEmployees || []),
        t.createdBy,
      ]
        .map((x) => safeStr(x).toLowerCase())
        .join(" ");
      return hay.includes(q);
    });
  }, [baseList, query, tab, status, priority, projects]);

  const selected = useMemo(() => {
    return filtered.find((t) => t.id === selectedId) || null;
  }, [filtered, selectedId]);

  // reset paging when filters change
  useEffect(() => {
    setPage(1);
    setVisibleCount(8);
  }, [query, tab, status, priority, viewMode, pageSize]);

  const totalPages = useMemo(() => {
    if (viewMode !== "pagination") return 1;
    return Math.max(1, Math.ceil(filtered.length / pageSize));
  }, [filtered.length, viewMode, pageSize]);

  const shown = useMemo(() => {
    if (viewMode === "pagination") {
      const start = (page - 1) * pageSize;
      return filtered.slice(start, start + pageSize);
    }
    return filtered.slice(0, visibleCount);
  }, [filtered, viewMode, page, pageSize, visibleCount]);

  // infinite auto-load (Load More mode)
  useEffect(() => {
    if (viewMode !== "loadmore") return;
    if (!sentinelRef.current) return;

    const node = sentinelRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (!hit) return;
        setVisibleCount((v) => Math.min(v + 8, filtered.length));
      },
      { root: null, threshold: 0.25 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [viewMode, filtered.length]);

  const canManage = (task) => {
    if (!task) return false;
    // can edit/delete if created by self or HR
    return isHR || task.createdBy === currentEmployeeId;
  };

  const toggleCompleted = (task) => {
    if (!task) return;
    const isCompleted = norm(task.status) === "completed";
    const now = new Date().toISOString();

    if (isCompleted) {
      updateTask(
        task.id,
        { status: "working", progress: Math.min(99, Number(task.progress || 0) || 0), completedAt: null, updatedAt: now },
        {
          action: "status_changed",
          summary: "Marked as not completed.",
          changes: { status: { from: "completed", to: "working" } },
        }
      );
    } else {
      updateTask(
        task.id,
        { status: "completed", progress: 100, completedAt: now, updatedAt: now },
        {
          action: "completed",
          summary: "Marked as completed.",
          changes: { status: { from: task.status, to: "completed" }, progress: { from: task.progress, to: 100 } },
        }
      );
    }
  };

  const onDelete = (task) => {
    if (!task) return;
    if (!canManage(task)) return;

    const ok = window.confirm(`Delete task ${task.id}?`);
    if (!ok) return;

    if (selectedId === task.id) setSelectedId(null);
    deleteTask(task.id);
  };

  const openEdit = (task) => {
    if (!canManage(task)) return;
    setEditOpen(true);
  };

  const createSubmit = (payload) => {
    const now = new Date().toISOString();
    const id = getNextTaskId(tasks);

    const newTask = {
      id,
      subject: payload.subject,
      detail: payload.detail,
      status: payload.status,
      priority: payload.priority,
      progress: Number(payload.progress || 0),
      createdAt: now,
      updatedAt: now,
      createdBy: currentEmployeeId || "System",
      expectedStartAt: payload.expectedStartAt,
      expectedEndAt: payload.expectedEndAt,
      completedAt: payload.status === "completed" ? now : null,
      projectId: payload.projectId || (projects || [])[0]?.id || "",
      assignedEmployees: payload.assignedEmployees || (currentEmployeeId ? [currentEmployeeId] : []),
      history: [
        {
          at: now,
          by: currentEmployeeId || "System",
          action: "created",
          summary: "Created task.",
        },
      ],
    };

    // if completed, enforce progress 100
    if (norm(newTask.status) === "completed") {
      newTask.progress = 100;
      newTask.completedAt = newTask.completedAt || now;
    }
    if (Number(newTask.progress) === 100) {
      newTask.status = "completed";
      newTask.completedAt = newTask.completedAt || now;
    }

    addTask(newTask);
    setCreateOpen(false);
  };

  const editSubmit = (payload) => {
    if (!selected) return;
    if (!canManage(selected)) return;

    const now = new Date().toISOString();
    const patch = {
      subject: payload.subject,
      detail: payload.detail,
      priority: payload.priority,
      status: payload.status,
      expectedStartAt: payload.expectedStartAt,
      expectedEndAt: payload.expectedEndAt,
      progress: Number(payload.progress || 0),
      updatedAt: now,
    };

    // HR can change project and assignees
    if (isHR) {
      patch.projectId = payload.projectId;
      patch.assignedEmployees = payload.assignedEmployees;
    }

    updateTask(selected.id, patch, {
      action: "edited",
      summary: "Edited task fields.",
    });

    setEditOpen(false);
  };

  const EmptyState = () => (
    <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-8 text-center">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-gray-50 dark:bg-white/5 grid place-items-center">
        <ClipboardList className="w-6 h-6 text-gray-500 dark:text-gray-300" />
      </div>
      <div className="mt-3 text-lg font-bold">No tasks</div>
      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        You don’t have any tasks in this view.
      </div>
      <button
        onClick={() => setCreateOpen(true)}
        className="mt-4 h-10 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition inline-flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Create task
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/")}>
          Dashboard
        </span>{" "}
        /{" "}
        <span className="font-medium text-gray-900 dark:text-white">Tasks</span>
      </div>

      {/* Desktop header + controls */}
      <div className="hidden lg:block space-y-4">
        <div className="flex items-start md:items-center justify-between gap-3">
          <div>
            <div className="text-xl font-bold">{isHR ? "All Tasks" : "My Tasks"}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {(filtered || []).length} tasks • Logged in as {userData?.firstName || "User"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreateOpen(true)}
              className="h-10 px-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition inline-flex items-center gap-2 text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Create
            </button>

            <button
              onClick={() => setViewMode((m) => (m === "loadmore" ? "pagination" : "loadmore"))}
              className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition inline-flex items-center gap-2 text-sm font-semibold"
              title="Toggle pagination mode"
            >
              <Filter className="w-4 h-4" />
              {viewMode === "loadmore" ? "Auto load" : "Pages"}
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

        <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks..."
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

            <div className="flex flex-wrap items-center gap-2">
              {/* Tabs */}
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
                  onClick={() => setTab("open")}
                  className={`h-8 px-3 rounded-lg text-sm font-semibold transition ${
                    tab === "open"
                      ? "bg-white dark:bg-[#0b1016] shadow-sm"
                      : "text-gray-500 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  Open
                </button>
                <button
                  onClick={() => setTab("completed")}
                  className={`h-8 px-3 rounded-lg text-sm font-semibold transition ${
                    tab === "completed"
                      ? "bg-white dark:bg-[#0b1016] shadow-sm"
                      : "text-gray-500 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  Completed
                </button>
              </div>

              {/* Status filter */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
                title="Status"
              >
                {["all", "open", "working", "pending", "review", "overdue", "completed", "canceled", "transferred"].map(
                  (s) => (
                    <option key={s} value={s}>
                      {s === "all" ? "All status" : s}
                    </option>
                  )
                )}
              </select>

              {/* Priority filter */}
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
                title="Priority"
              >
                {["all", "Low", "Medium", "High"].map((p) => (
                  <option key={p} value={p}>
                    {p === "all" ? "All priority" : p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/iPad compact controls */}
      <div className="lg:hidden rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-sm font-bold">Tasks</div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              {(filtered || []).length} tasks
            </div>
          </div>

          <button
            onClick={() => setCreateOpen(true)}
            className="h-10 px-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition text-sm font-semibold inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create
          </button>
        </div>

        <div className="flex items-center gap-2">
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
            onClick={() => setTab((t) => (t === "all" ? "open" : t === "open" ? "completed" : "all"))}
            className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold"
            title="Toggle tabs"
          >
            {tab === "all" ? "Open" : tab === "open" ? "Done" : "All"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
            title="Status"
          >
            {["all", "open", "working", "pending", "review", "overdue", "completed", "canceled", "transferred"].map(
              (s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All status" : s}
                </option>
              )
            )}
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
            title="Priority"
          >
            {["all", "Low", "Medium", "High"].map((p) => (
              <option key={p} value={p}>
                {p === "all" ? "All priority" : p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ✅ RESPONSIVE FIX: 2-col only on xl */}
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
              {shown.map((t) => {
                const isSelected = t.id === selectedId;
                const isExpanded = t.id === expandedId;

                return (
                  <div
                    key={t.id}
                    className={`rounded-2xl border bg-white dark:bg-[#0b1016] transition ${
                      norm(t.status) !== "completed"
                        ? "border-gray-100 dark:border-white/10"
                        : "border-emerald-200/60 dark:border-emerald-500/20"
                    }`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setSelectedId(t.id);
                        setExpandedId((prev) => (prev === t.id ? null : t.id));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedId(t.id);
                          setExpandedId((prev) => (prev === t.id ? null : t.id));
                        }
                      }}
                      className="w-full p-4 text-left cursor-pointer select-none"
                      aria-label="Open task"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-white/5 grid place-items-center shrink-0">
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                            {(safeStr(t.subject).trim()[0] || "T").toUpperCase()}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                {norm(t.status) !== "completed" ? (
                                  <Circle className="w-3.5 h-3.5 text-primary" />
                                ) : (
                                  <CheckCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                                )}

                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                  {t.subject || "Task"}
                                </p>
                              </div>

                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                                {t.id} • {projectName(t.projectId)} • {formatRelative(t.createdAt)}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${statusBadge(t.status)}`}>
                                {safeStr(t.status).toUpperCase()}
                              </span>

                              <span className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${priorityBadge(t.priority)}`}>
                                {safeStr(t.priority).toUpperCase()}
                              </span>

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
                            {t.detail || "—"}
                          </p>

                          {/* mobile/tablet expandable detail (below xl) */}
                          <div className={`xl:hidden ${isExpanded ? "mt-3" : "hidden"}`}>
                            <div className="rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="min-w-0">
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Assignees</div>
                                  <div className="text-sm font-semibold text-gray-900 dark:text-white break-words">
                                    {(t.assignedEmployees || []).map(employeeName).join(", ") || "—"}
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
                                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {Number(t.progress || 0)}%
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCompleted(t);
                                  }}
                                  className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold inline-flex items-center gap-2"
                                >
                                  <CheckCheck className="w-4 h-4" />
                                  {norm(t.status) === "completed" ? "Undo" : "Complete"}
                                </button>

                                {canManage(t) ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedId(t.id);
                                        openEdit(t);
                                      }}
                                      className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold inline-flex items-center gap-2"
                                    >
                                      <Pencil className="w-4 h-4" />
                                      Edit
                                    </button>

                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(t);
                                      }}
                                      className="h-10 px-3 rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-500/15 transition text-sm font-semibold inline-flex items-center gap-2"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Delete
                                    </button>
                                  </>
                                ) : null}
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

              {/* sentinel for auto-load */}
              {viewMode === "loadmore" ? (
                <>
                  <div ref={sentinelRef} className="h-8" />
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-1">
                    Showing {Math.min(visibleCount, filtered.length)} / {filtered.length}
                  </div>
                </>
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
              <div className="text-lg font-bold">Select a task</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Click a task from the list to see details.
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] p-6 xl:sticky xl:top-4 min-w-0 overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-lg font-bold text-gray-900 dark:text-white truncate">
                    {selected.subject || "Task"}
                  </div>

                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">{selected.id}</span> • Created {formatRelative(selected.createdAt)}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${statusBadge(selected.status)}`}>
                      {safeStr(selected.status).toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${priorityBadge(selected.priority)}`}>
                      {safeStr(selected.priority).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleCompleted(selected)}
                    className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <CheckCheck className="w-4 h-4" />
                    {norm(selected.status) === "completed" ? "Undo" : "Complete"}
                  </button>

                  {canManage(selected) ? (
                    <>
                      <button
                        type="button"
                        onClick={() => openEdit(selected)}
                        className="h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold inline-flex items-center gap-2"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(selected)}
                        className="h-10 px-3 rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-500/15 transition text-sm font-semibold inline-flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4 min-w-0 space-y-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Details</div>
                  <div className="mt-1 text-sm text-gray-900 dark:text-white leading-relaxed whitespace-pre-line break-words">
                    {selected.detail || "—"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-2">
                      <Users className="w-4 h-4" /> Assignees
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white break-words mt-1">
                      {(selected.assignedEmployees || []).map(employeeName).join(", ") || "—"}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" /> Progress
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${Math.max(0, Math.min(100, Number(selected.progress || 0)))}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {Number(selected.progress || 0)}%
                      {norm(selected.status) === "completed" ? " (locked)" : ""}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-2">
                      <ClipboardList className="w-4 h-4" /> Project
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white break-words mt-1">
                      {projectName(selected.projectId)}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Dates
                    </div>
                    <div className="text-xs text-gray-700 dark:text-gray-200 mt-1 space-y-1">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Expected:</span>{" "}
                        {selected.expectedStartAt ? new Date(selected.expectedStartAt).toLocaleString() : "—"} →{" "}
                        {selected.expectedEndAt ? new Date(selected.expectedEndAt).toLocaleString() : "—"}
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Completed:</span>{" "}
                        {selected.completedAt ? new Date(selected.completedAt).toLocaleString() : "—"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* History */}
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">History</div>
                  <div className="mt-2 space-y-2">
                    {(selected.history || []).slice().reverse().slice(0, 8).map((h, idx) => (
                      <div
                        key={`${h.at}-${idx}`}
                        className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {h.summary || "Update"}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {employeeName(h.by)} • {formatRelative(h.at)}
                            </div>
                          </div>
                          <span className="text-[11px] px-2 py-1 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200">
                            {safeStr(h.action).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                    {(!selected.history || selected.history.length === 0) && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">No history yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      <TaskFormModal
        open={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
        onSubmit={createSubmit}
        initialTask={null}
        isHR={isHR}
        employees={allEmployees}
        projects={projects || []}
        currentEmployeeId={currentEmployeeId}
      />

      {/* Edit Modal */}
      <TaskFormModal
        open={editOpen}
        mode="edit"
        onClose={() => setEditOpen(false)}
        onSubmit={editSubmit}
        initialTask={selected}
        isHR={isHR}
        employees={allEmployees}
        projects={projects || []}
        currentEmployeeId={currentEmployeeId}
      />
    </div>
  );
};

export default Tasks;
