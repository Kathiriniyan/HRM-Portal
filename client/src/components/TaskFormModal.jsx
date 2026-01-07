// src/components/tasks/TaskFormModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { X, Save } from "lucide-react";

const safeStr = (v) => (v ?? "").toString();
const norm = (v) => safeStr(v).trim().toLowerCase();

const toInputDateTimeLocal = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

const fromInputDateTimeLocal = (val) => {
  if (!val) return null;
  const d = new Date(val);
  const ms = d.getTime();
  return Number.isNaN(ms) ? null : new Date(ms).toISOString();
};

const modalSelectStyles = {
  control: (base) => ({
    ...base,
    minHeight: 40,
    borderRadius: 12,
    borderColor: "rgba(229,231,235,1)",
    backgroundColor: "transparent",
  }),
  menu: (base) => ({ ...base, borderRadius: 12, overflow: "hidden" }),
};

export default function TaskFormModal({
  open,
  mode = "create", // "create" | "edit"
  onClose,
  onSubmit,
  // data
  initialTask,
  isHR,
  employees,
  projects,
  currentEmployeeId,
}) {
  const [subject, setSubject] = useState("");
  const [detail, setDetail] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("open");
  const [expectedStartAt, setExpectedStartAt] = useState("");
  const [expectedEndAt, setExpectedEndAt] = useState("");
  const [progress, setProgress] = useState(0);

  // HR-only
  const [projectId, setProjectId] = useState("");
  const [assignees, setAssignees] = useState([]);

  const employeeOptions = useMemo(() => {
    return (employees || []).map((e) => ({
      value: e.id,
      label: `${safeStr(e.firstName)} ${safeStr(e.lastName)}`.trim() || e.id,
    }));
  }, [employees]);

  const projectOptions = useMemo(() => {
    return (projects || []).map((p) => ({
      value: p.id,
      label: p.name || p.id,
    }));
  }, [projects]);

  const canDragProgress = norm(status) !== "completed";

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialTask) {
      setSubject(safeStr(initialTask.subject));
      setDetail(safeStr(initialTask.detail));
      setPriority(initialTask.priority || "Low");
      setStatus(initialTask.status || "open");
      setExpectedStartAt(toInputDateTimeLocal(initialTask.expectedStartAt));
      setExpectedEndAt(toInputDateTimeLocal(initialTask.expectedEndAt));
      setProgress(Number(initialTask.progress || 0));

      // HR-only
      setProjectId(initialTask.projectId || "");
      setAssignees(
        (initialTask.assignedEmployees || []).map((id) => {
          const opt = employeeOptions.find((x) => x.value === id);
          return opt || { value: id, label: id };
        })
      );
    } else {
      // create defaults
      setSubject("");
      setDetail("");
      setPriority("Low");
      setStatus("open");
      setExpectedStartAt("");
      setExpectedEndAt("");
      setProgress(0);

      // HR defaults
      const firstProject = (projects || [])[0]?.id || "";
      setProjectId(firstProject);
      // default: self assigned (HR can remove)
      const selfOpt = employeeOptions.find((x) => x.value === currentEmployeeId);
      setAssignees(selfOpt ? [selfOpt] : []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    // if progress reaches 100 -> completed
    if (Number(progress) >= 100) {
      setProgress(100);
      setStatus("completed");
    }
  }, [progress]);

  useEffect(() => {
    // if status becomes completed -> lock progress
    if (norm(status) === "completed") setProgress(100);
  }, [status]);

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      subject: subject.trim(),
      detail: detail.trim(),
      priority,
      status,
      expectedStartAt: fromInputDateTimeLocal(expectedStartAt),
      expectedEndAt: fromInputDateTimeLocal(expectedEndAt),
      progress: Number(progress) || 0,
    };

    if (isHR) {
      payload.projectId = projectId || (projects || [])[0]?.id || "";
      payload.assignedEmployees = (assignees || []).map((a) => a.value);
    } else {
      // normal user: self task only
      payload.projectId = (projects || [])[0]?.id || "";
      payload.assignedEmployees = currentEmployeeId ? [currentEmployeeId] : [];
    }

    onSubmit?.(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <form
          onSubmit={submit}
          className="w-full max-w-2xl rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0b1016] shadow-xl overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">
                {mode === "edit" ? "Edit Task" : "Create Task"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {isHR ? "HR mode" : "Self task"}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 grid place-items-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">Subject</label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
                  placeholder="Task subject..."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">Description</label>
                <textarea
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  className="mt-1 w-full min-h-[90px] p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
                  placeholder="Task description..."
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
                >
                  {["Low", "Medium", "High"].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
                >
                  {["open", "working", "pending", "review", "overdue", "completed", "canceled", "transferred"].map(
                    (s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">Expected Start</label>
                <input
                  type="datetime-local"
                  value={expectedStartAt}
                  onChange={(e) => setExpectedStartAt(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">Expected Close</label>
                <input
                  type="datetime-local"
                  value={expectedEndAt}
                  onChange={(e) => setExpectedEndAt(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Progress {norm(status) === "completed" ? "(locked)" : ""}
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={progress}
                    disabled={!canDragProgress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="w-14 text-right text-sm font-semibold">
                    {Number(progress || 0)}%
                  </div>
                </div>
              </div>

              {isHR ? (
                <>
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-500 dark:text-gray-400">Project</label>
                    <select
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      className="mt-1 w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] text-sm outline-none"
                    >
                      {projectOptions.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-500 dark:text-gray-400">
                      Assignees (multi select)
                    </label>
                    <div className="mt-1">
                      <Select
                        isMulti
                        value={assignees}
                        onChange={(v) => setAssignees(v || [])}
                        options={employeeOptions}
                        styles={modalSelectStyles}
                      />
                    </div>
                    <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                      Tip: include yourself if this is a self-task.
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-primary text-white hover:bg-primary/90 transition text-sm font-semibold inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {mode === "edit" ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
