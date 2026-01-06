const TopBar = () => {
    // dummy data matching screenshot
    const schedule = {
      label: "Your Schedule",
      date: "28 March",
      left: {
        avatar: { name: "A", src: "" },
        duration: "36 min",
      },
      start: {
        time: "2:00 pm",
        people: [
          { name: "P", src: "" },
          { name: "S", src: "" },
        ],
      },
      now: "2:15 pm",
      end: {
        time: "3:00 pm",
        people: [
          { name: "M", src: "" },
          { name: "R", src: "" },
        ],
      },
    };

    // “now” position on the green rail (0..1). screenshot is around middle-ish.
    const pct = 0.62;

    const Avatar = ({ src, name, size = 28 }) => (
      <span
        className="grid place-items-center rounded-full overflow-hidden bg-white/85 text-slate-900 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.45)]"
        style={{ width: size, height: size }}
        title={name}
      >
        {src ? (
          <img src={src} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-[11px] font-extrabold">{(name || "U").slice(0, 1)}</span>
        )}
      </span>
    );

    const Stack = ({ people }) => (
      <div className="flex -space-x-2">
        {people.slice(0, 2).map((p, i) => (
          <span
            key={`${p.name}-${i}`}
            className="rounded-full ring-2 ring-white/85 dark:ring-slate-900/80"
          >
            <Avatar src={p.src} name={p.name} size={28} />
          </span>
        ))}
      </div>
    );

    const DotDivider = () => (
      <span className="mx-1 h-8 w-px rounded-full bg-white/45" aria-hidden="true" />
    );

    return (
      <div className="sticky top-0 z-30">
        <div className="flex items-center gap-4">
          {/* MAIN PILL (white) */}
          <div
            className={[
              "flex-1 min-w-0",
              "h-16 rounded-full",
              "bg-white",
              "border border-slate-100",
              "shadow-[0_18px_55px_-40px_rgba(2,6,23,0.35)]",
              "dark:bg-slate-900 dark:border-slate-800",
              "px-3",
              "flex items-center gap-3",
            ].join(" ")}
          >
            {/* Left label */}
            <div className="min-w-[140px] pl-2">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {schedule.label}
              </div>
            </div>

            {/* Date capsule */}
            <div
              className={[
                "h-12 rounded-full",
                "bg-slate-50",
                "border border-slate-200",
                "dark:bg-slate-950/20 dark:border-slate-700/40",
                "px-3",
                "flex items-center gap-2",
              ].join(" ")}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                <CalendarCheck2 className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {schedule.date}
              </span>
            </div>

            {/* GREEN RAIL (center) */}
            <div className="flex-1 min-w-0">
              <div
                className={[
                  "relative h-12 rounded-full overflow-hidden",
                  "bg-[#9BE84B]",
                  "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)]",
                ].join(" ")}
              >
                {/* content row */}
                <div className="absolute inset-0 flex items-center justify-between px-3">
                  {/* LEFT cluster: avatar + 36 min + diagonal arrow */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Avatar src={schedule.left.avatar.src} name={schedule.left.avatar.name} size={30} />
                    <span className="text-xs font-semibold text-slate-900/80">
                      {schedule.left.duration}
                    </span>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white/40">
                      <ArrowUpRight className="h-4 w-4 text-slate-900/80" />
                    </span>
                  </div>

                  <DotDivider />

                  {/* START time + avatars */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-extrabold text-slate-900/80">{schedule.start.time}</span>
                    <Stack people={schedule.start.people} />
                  </div>

                  {/* spacer to let marker sit visually in the middle */}
                  <div className="flex-1 min-w-0" />

                  {/* little “chart” icon (like screenshot) */}
                  <div className="shrink-0">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/40">
                      <BarChart3 className="h-4 w-4 text-slate-900/80" />
                    </span>
                  </div>

                  <DotDivider />

                  {/* END time + avatars */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-extrabold text-slate-900/80">{schedule.end.time}</span>
                    <Stack people={schedule.end.people} />
                  </div>
                </div>

                {/* NOW MARKER (vertical line + black bubble) */}
                <div
                  className="absolute top-0 bottom-0"
                  style={{ left: `calc(${pct * 100}% - 1px)` }}
                >
                  <div className="absolute top-1 bottom-1 w-[2px] rounded-full bg-white/90" />
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-2 py-1 rounded-full bg-black/80 text-white text-[11px] font-semibold shadow">
                      {schedule.now}
                    </div>
                  </div>
                </div>

                {/* soft gloss */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),transparent_55%)]" />
              </div>
            </div>

            {/* Right little round button with arrow (outside green) */}
            <button
              type="button"
              className={[
                "grid h-11 w-11 place-items-center rounded-full",
                "bg-white border border-slate-200",
                "hover:bg-slate-50 transition",
                "dark:bg-slate-950/30 dark:border-slate-800 dark:hover:bg-slate-800/40",
              ].join(" ")}
              title="Open"
            >
              <ArrowUpRight className="h-5 w-5 text-slate-700 dark:text-slate-100" />
            </button>
          </div>

          {/* RIGHT SIDE ICONS (bell with red dot + avatar) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className={[
                "relative grid h-11 w-11 place-items-center rounded-full",
                "bg-black/90",
                "shadow-[0_18px_55px_-40px_rgba(0,0,0,0.65)]",
              ].join(" ")}
              title="Notifications"
            >
              <Bell className="h-5 w-5 text-white/90" />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <button
              type="button"
              className={[
                "grid h-11 w-11 place-items-center rounded-full",
                "bg-black/90",
                "shadow-[0_18px_55px_-40px_rgba(0,0,0,0.65)]",
              ].join(" ")}
              title="Account"
            >
              <Avatar src="" name="T" size={32} />
            </button>
          </div>
        </div>
      </div>
    );
  };