import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  MapPin,
  Code2,
  Users,
  ChevronRight,
  GraduationCap,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { useLocalProjects } from "@/hooks/use-local-projects";
import { useProfile } from "@/hooks/use-profile";
import { useAdmin } from "@/hooks/use-admin";
import { ProjectManager } from "@/components/ProjectManager";
import { ProfileEditor } from "@/components/ProfileEditor";
import { AdminBar } from "@/components/AdminBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chan Piseth | IT Support Specialist & Developer" },
      {
        name: "description",
        content:
          "Portfolio of Chan Piseth — IT Support Specialist, Full-Stack Developer, and IoT enthusiast based in Cambodia.",
      },
    ],
  }),
  component: Index,
});

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
    >
      {children}
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
          {eyebrow}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function Index() {
  const { projects, addProject, updateProject, deleteProject } = useLocalProjects();
  const { profile, update } = useProfile();
  const { isAdmin } = useAdmin();

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Decorative background orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl animate-float" />
        <div
          className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b border-border/40 glass">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 grid place-items-center text-primary-foreground text-xs font-bold shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
              {initials}
            </div>
            <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
          </a>
          <div className="hidden md:flex items-center gap-7">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
          <AdminBar />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative border-b border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-[1fr_auto] items-center gap-12">
            <div className="space-y-6 animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for opportunities
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                <span className="text-gradient">{profile.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-muted-foreground">
                {profile.title}
              </p>
              <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                {profile.tagline}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all"
                >
                  Get in touch
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
                >
                  View projects
                </a>
                {isAdmin && <ProfileEditor profile={profile} onChange={update} />}
              </div>
            </div>

            <div
              className="relative animate-fade-up justify-self-center"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/30 to-primary/5 rounded-full blur-2xl animate-gradient" />
              <div className="relative h-56 w-56 sm:h-64 sm:w-64 rounded-full overflow-hidden ring-4 ring-background shadow-2xl shadow-primary/20">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-7xl font-bold">
                    {initials}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 rounded-2xl border border-border/60 bg-card px-3 py-2 shadow-lg flex items-center gap-2 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium">Open to work</span>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              {profile.phone}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4 text-primary" />
              {profile.email}
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-28">
        {/* About */}
        <section id="about">
          <SectionHeader eyebrow="01 — About" title="A bit about me" />
          <Card className="hover-lift overflow-hidden border-border/60">
            <CardContent className="p-8 grid sm:grid-cols-2 gap-x-12 gap-y-4 text-sm">
              {[
                ["Name", profile.name],
                ["Gender", profile.about.gender],
                ["Nationality", profile.about.nationality],
                ["Date of Birth", profile.about.dob],
                ["Address", profile.about.address],
                ["Languages", profile.about.languages],
              ].map(([k, v]) => (
                <div key={k} className="flex border-b border-border/40 py-2">
                  <span className="w-32 text-muted-foreground shrink-0">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Skills */}
        <section id="skills">
          <SectionHeader eyebrow="02 — Skills" title="What I work with" />
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover-lift border-border/60 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <CardContent className="p-6 space-y-4 relative">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="grid place-items-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
                    <Code2 className="h-4 w-4" />
                  </span>
                  Hard Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.hardSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs py-1 px-2.5 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="hover-lift border-border/60 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <CardContent className="p-6 space-y-4 relative">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="grid place-items-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
                    <Users className="h-4 w-4" />
                  </span>
                  Soft Skills
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {profile.softSkills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 group">
                      <ChevronRight className="h-3.5 w-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience */}
        <section id="experience">
          <SectionHeader eyebrow="03 — Experience" title="Where I've worked" />
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
            {profile.experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="absolute -left-6 sm:-left-8 top-6 h-3 w-3 rounded-full bg-primary ring-4 ring-background shadow-lg shadow-primary/40 group-hover:scale-125 transition-transform" />
                <Card className="hover-lift border-border/60">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {exp.company}{exp.location && ` — ${exp.location}`}
                    </p>
                    <ul className="space-y-1.5">
                      {exp.bullets.filter(Boolean).map((bullet, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education">
          <SectionHeader eyebrow="04 — Education" title="Academic background" />
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.education.map((edu) => (
              <Card key={edu.id} className="hover-lift border-border/60">
                <CardContent className="p-5 flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-primary mb-1">
                      {edu.period}
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {edu.school}{edu.location && `, ${edu.location}`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <ProjectManager
            projects={projects}
            onAdd={addProject}
            onUpdate={updateProject}
            onDelete={deleteProject}
            canEdit={isAdmin}
          />
        </section>

        {/* References / Contact */}
        <section id="contact">
          <SectionHeader eyebrow="05 — References" title="People who know my work" />
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.references.map((ref) => (
              <Card key={ref.id} className="hover-lift border-border/60">
                <CardContent className="p-6 space-y-2 text-sm">
                  <h3 className="font-semibold text-base">{ref.name}</h3>
                  <p className="text-muted-foreground">{ref.position}</p>
                  <div className="pt-2 space-y-1 text-xs text-muted-foreground border-t border-border/40 mt-3">
                    <p className="pt-2">Tel: {ref.tel}</p>
                    <p>
                      Email:{" "}
                      <a
                        href={`mailto:${ref.email}`}
                        className="text-primary hover:underline"
                      >
                        {ref.email}
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 mt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile.name}. Crafted with care.</p>
        </div>
      </footer>
    </div>
  );
}
