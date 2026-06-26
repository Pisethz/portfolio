import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  MapPin,
  Code2,
  Cpu,
  Globe,
  Server,
  Database,
  Paintbrush,
  Wifi,
  Users,
  Brain,
  Lightbulb,
  Puzzle,
  Eye,
  MessageCircle,
  GraduationCap,
  Briefcase,
  Calendar,
  ChevronRight,
} from "lucide-react";

import { useLocalProjects } from "@/hooks/use-local-projects";
import { ProjectManager } from "@/components/ProjectManager";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chan Piseth | IT Support Specialist & Developer" },
      {
        name: "description",
        content:
          "Portfolio of Chan Piseth — IT Support Specialist, Full-Stack Developer, and IoT enthusiast based in Cambodia.",
      },
      {
        property: "og:title",
        content: "Chan Piseth | IT Support Specialist & Developer",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Chan Piseth — IT Support Specialist, Full-Stack Developer, and IoT enthusiast based in Cambodia.",
      },
    ],
  }),
  component: Index,
});

const hardSkills = [
  { name: "Vue.js", icon: Code2 },
  { name: "PHP", icon: Code2 },
  { name: "Laravel", icon: Code2 },
  { name: "C#", icon: Cpu },
  { name: "Node.js", icon: Server },
  { name: "JavaScript", icon: Code2 },
  { name: "Bootstrap", icon: Globe },
  { name: "API (JSON)", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "SQL Server", icon: Database },
  { name: "WebSockets", icon: Wifi },
  { name: "Networking", icon: Wifi },
  { name: "MikroTik", icon: Wifi },
  { name: "Photoshop", icon: Paintbrush },
  { name: "Illustration", icon: Paintbrush },
];

const softSkills = [
  { name: "Communication", icon: MessageCircle },
  { name: "Teamwork", icon: Users },
  { name: "Perseverance", icon: Brain },
  { name: "Problem Solving", icon: Puzzle },
  { name: "Critical Thinking", icon: Lightbulb },
];

const experiences = [
  {
    period: "May 2025 – Present",
    title: "Technical / IT Support, Networking",
    company: "Pojet Technology",
    location: "Poi Pet, Cambodia",
    bullets: ["IT Support and Networking services"],
  },
  {
    period: "March 2025 – May 2025",
    title: "IT Support, IT Officer, Database Developer",
    company: "Union Tower",
    location: "Poi Pet, Cambodia",
    bullets: [
      "Provided IT support and officer duties",
      "Developed and maintained databases",
    ],
  },
  {
    period: "2022 – 2024",
    title: "Research & Development (R&D Center)",
    company: "Research and Technology Development Center",
    location: "Phnom Penh, Cambodia",
    bullets: [
      "Built and Developed an IoT Smart Home system",
      "Built and Developed an IoT platform for real-time monitoring of industrial mechatronic system",
      "Build Score keeper for Display and control for NPC robocon contest 2024 platform",
      "Mechatronic & Automation",
      "IoT-Agriculture",
    ],
  },
];

const education = [
  {
    period: "2020 – 2024",
    degree: "Bachelor of Computer Science",
    school: "National Polytechnic Institute of Cambodia",
    location: "Phnom Penh",
  },
  {
    period: "2020 – 2022",
    degree: "Associate Degree of English",
    school: "National Polytechnic Institute of Cambodia",
    location: "Phnom Penh",
  },
  {
    period: "2014 – 2020",
    degree: "High School Diploma",
    school: "Gambel High School",
    location: "Banteay Meanchey",
  },
  {
    period: "2010 – 2014",
    degree: "Primary School",
    school: "Gambel Primary School",
    location: "Banteay Meanchey",
  },
  {
    period: "2007 – 2010",
    degree: "Primary School",
    school: "Songkae Pong Primary School",
    location: "Kampong Cham",
  },
];

const references = [
  {
    name: "Mr. KH OEM Sambath",
    position: "Lecturer, Computer Science of NPIC",
    tel: "096 248 0632",
    email: "sambathkhoem@gmail.com",
  },
  {
    name: "Mr. LORN Vanneth",
    position: "Research Staff of Research and Technology Development Center",
    tel: "098 269 006",
    email: "lornvanneth@npic.edu.kh",
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight mb-6 flex items-center gap-2">
      <Separator className="w-8 bg-primary" />
      {children}
    </h2>
  );
}

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
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </a>
  );
}

function Index() {
  const { projects, addProject, updateProject, deleteProject } = useLocalProjects();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
          <a href="#" className="text-base font-semibold tracking-tight">
            CP
          </a>
          <div className="hidden sm:flex items-center gap-6">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#references">References</NavLink>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="flex h-24 w-24 sm:h-32 sm:w-32 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl sm:text-4xl font-bold">
              CP
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Chan Piseth
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium">
                IT Support Specialist & Developer
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Poi Pet, Banteay Meanchey, Cambodia
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  (+855) 17 762 585
                </span>
                <a
                  href="mailto:piseth79@gmail.com"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  piseth79@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* About */}
        <section id="about">
          <SectionTitle>About Me</SectionTitle>
          <Card>
            <CardContent className="p-6 grid sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex">
                  <span className="w-28 text-muted-foreground shrink-0">Name</span>
                  <span className="font-medium">: Chan Piseth</span>
                </div>
                <div className="flex">
                  <span className="w-28 text-muted-foreground shrink-0">Gender</span>
                  <span>: Male</span>
                </div>
                <div className="flex">
                  <span className="w-28 text-muted-foreground shrink-0">Nationality</span>
                  <span>: Khmer</span>
                </div>
                <div className="flex">
                  <span className="w-28 text-muted-foreground shrink-0">Date of Birth</span>
                  <span>: September 10, 2002</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex">
                  <span className="w-28 text-muted-foreground shrink-0">Address</span>
                  <span>
                    : Gambel Village, Gambel Commune, Serey Sophon Town, Banteay Meanchey
                  </span>
                </div>
                <div className="flex">
                  <span className="w-28 text-muted-foreground shrink-0">Languages</span>
                  <span>: Khmer (Native), English (Good)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skills */}
        <section id="skills">
          <SectionTitle>Skills</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  Hard Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hardSkills.map((skill) => (
                    <Badge key={skill.name} variant="secondary" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Soft Skills
                </h3>
                <ul className="space-y-2 text-sm">
                  {softSkills.map((skill) => (
                    <li key={skill.name} className="flex items-center gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience */}
        <section id="experience">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <Card key={exp.period}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0 sm:w-36">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} — {exp.location}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mt-3 sm:pl-40">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-4">
            {education.map((edu) => (
              <Card key={edu.period}>
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0 sm:w-36">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {edu.period}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.school}, {edu.location}
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
          />
        </section>

        {/* References */}
        <section id="references">
          <SectionTitle>References</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {references.map((ref) => (
              <Card key={ref.name}>
                <CardContent className="p-5 space-y-2 text-sm">
                  <h3 className="font-semibold">{ref.name}</h3>
                  <p className="text-muted-foreground">{ref.position}</p>
                  <div className="pt-1 space-y-1 text-xs text-muted-foreground">
                    <p>Tel: {ref.tel}</p>
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

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p> Chan Piseth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
