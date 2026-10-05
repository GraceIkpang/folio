import type { Role } from "@/content/site";

export function ExperienceList({ roles }: { roles: Role[] }) {
  return (
    <ol>
      {roles.map((role) => (
        <li
          key={`${role.year}-${role.company}`}
          className="grid grid-cols-[1fr_auto] gap-x-6 border-t border-line py-4 first:border-t-0 sm:grid-cols-[108px_1fr_auto] sm:gap-x-0"
        >
          <p className="pt-[3px] text-meta text-muted">{role.year}</p>
          <div className="col-span-2 row-start-2 pt-1 sm:col-span-1 sm:row-start-auto sm:pt-0">
            <h3 className="font-display text-role font-semibold">{role.title}</h3>
            <p className="text-body text-muted">{role.company}</p>
          </div>
          <p className="pt-[3px] text-right text-meta text-muted sm:pl-6">{role.location}</p>
        </li>
      ))}
    </ol>
  );
}
