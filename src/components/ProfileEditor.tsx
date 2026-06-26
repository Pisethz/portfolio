import { useState, useRef } from "react";
import { Settings2, Upload, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import type {
  ProfileData,
  ExperienceItem,
  EducationItem,
  ReferenceItem,
} from "@/hooks/use-profile";

interface Props {
  profile: ProfileData;
  onChange: (patch: Partial<ProfileData>) => void;
}

function uid(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function SkillsEditor({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (!v) return;
    if (values.includes(v)) return;
    onChange([...values, v]);
    setInput("");
  };
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1.5 rounded-md border bg-muted/30 p-2 min-h-12">
        {values.map((s) => (
          <Badge key={s} variant="secondary" className="gap-1">
            {s}
            <button
              type="button"
              onClick={() => onChange(values.filter((x) => x !== s))}
              className="hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Type and press Enter"
        />
        <Button type="button" onClick={add} variant="outline">
          Add
        </Button>
      </div>
    </div>
  );
}

export function ProfileEditor({ profile, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image is too large (max 2MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ avatar: String(reader.result) });
      toast.success("Profile picture updated");
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Settings2 className="h-3.5 w-3.5" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Changes are saved automatically to your browser.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="exp">Experience</TabsTrigger>
            <TabsTrigger value="edu">Education</TabsTrigger>
          </TabsList>

          {/* BASIC */}
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full overflow-hidden border bg-muted flex items-center justify-center text-xl font-bold">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="" className="h-full w-full object-cover" />
                ) : (
                  profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatar}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileRef.current?.click()}
                  className="gap-1.5"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Upload picture
                </Button>
                {profile.avatar && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => onChange({ avatar: "" })}
                    className="gap-1.5 text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input
                  value={profile.name}
                  onChange={(e) => onChange({ name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Title / Role</Label>
                <Input
                  value={profile.title}
                  onChange={(e) => onChange({ title: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Tagline</Label>
              <Textarea
                rows={2}
                value={profile.tagline}
                onChange={(e) => onChange({ tagline: e.target.value })}
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input
                  value={profile.email}
                  onChange={(e) => onChange({ email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input
                  value={profile.phone}
                  onChange={(e) => onChange({ phone: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Location</Label>
                <Input
                  value={profile.location}
                  onChange={(e) => onChange({ location: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>

          {/* ABOUT */}
          <TabsContent value="about" className="space-y-3 pt-4">
            {(["gender", "nationality", "dob", "address", "languages"] as const).map((k) => (
              <div key={k} className="space-y-1.5">
                <Label className="capitalize">{k === "dob" ? "Date of Birth" : k}</Label>
                <Input
                  value={profile.about[k]}
                  onChange={(e) =>
                    onChange({ about: { ...profile.about, [k]: e.target.value } })
                  }
                />
              </div>
            ))}
          </TabsContent>

          {/* SKILLS */}
          <TabsContent value="skills" className="space-y-5 pt-4">
            <SkillsEditor
              label="Hard Skills"
              values={profile.hardSkills}
              onChange={(v) => onChange({ hardSkills: v })}
            />
            <SkillsEditor
              label="Soft Skills"
              values={profile.softSkills}
              onChange={(v) => onChange({ softSkills: v })}
            />
          </TabsContent>

          {/* EXPERIENCE */}
          <TabsContent value="exp" className="space-y-3 pt-4">
            {profile.experiences.map((exp, i) => (
              <Card key={exp.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-muted-foreground">
                      Experience #{i + 1}
                    </span>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive"
                      onClick={() =>
                        onChange({
                          experiences: profile.experiences.filter((e) => e.id !== exp.id),
                        })
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <Input
                      placeholder="Period"
                      value={exp.period}
                      onChange={(e) =>
                        onChange({
                          experiences: profile.experiences.map((x) =>
                            x.id === exp.id ? { ...x, period: e.target.value } : x,
                          ),
                        })
                      }
                    />
                    <Input
                      placeholder="Title"
                      value={exp.title}
                      onChange={(e) =>
                        onChange({
                          experiences: profile.experiences.map((x) =>
                            x.id === exp.id ? { ...x, title: e.target.value } : x,
                          ),
                        })
                      }
                    />
                    <Input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        onChange({
                          experiences: profile.experiences.map((x) =>
                            x.id === exp.id ? { ...x, company: e.target.value } : x,
                          ),
                        })
                      }
                    />
                    <Input
                      placeholder="Location"
                      value={exp.location}
                      onChange={(e) =>
                        onChange({
                          experiences: profile.experiences.map((x) =>
                            x.id === exp.id ? { ...x, location: e.target.value } : x,
                          ),
                        })
                      }
                    />
                  </div>
                  <Textarea
                    rows={3}
                    placeholder="One bullet per line"
                    value={exp.bullets.join("\n")}
                    onChange={(e) =>
                      onChange({
                        experiences: profile.experiences.map((x) =>
                          x.id === exp.id
                            ? { ...x, bullets: e.target.value.split("\n") }
                            : x,
                        ),
                      })
                    }
                  />
                </CardContent>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full gap-1.5"
              onClick={() => {
                const next: ExperienceItem = {
                  id: uid("exp"),
                  period: "",
                  title: "",
                  company: "",
                  location: "",
                  bullets: [],
                };
                onChange({ experiences: [next, ...profile.experiences] });
              }}
            >
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </TabsContent>

          {/* EDUCATION + REFERENCES */}
          <TabsContent value="edu" className="space-y-5 pt-4">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Education</h4>
              {profile.education.map((edu, i) => (
                <Card key={edu.id}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-muted-foreground">
                        #{i + 1}
                      </span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        onClick={() =>
                          onChange({
                            education: profile.education.filter((e) => e.id !== edu.id),
                          })
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {(["period", "degree", "school", "location"] as const).map((k) => (
                        <Input
                          key={k}
                          placeholder={k}
                          value={edu[k]}
                          onChange={(e) =>
                            onChange({
                              education: profile.education.map((x) =>
                                x.id === edu.id ? { ...x, [k]: e.target.value } : x,
                              ),
                            })
                          }
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full gap-1.5"
                onClick={() => {
                  const next: EducationItem = {
                    id: uid("edu"),
                    period: "",
                    degree: "",
                    school: "",
                    location: "",
                  };
                  onChange({ education: [next, ...profile.education] });
                }}
              >
                <Plus className="h-4 w-4" />
                Add Education
              </Button>
            </div>

            <div className="space-y-3 pt-2 border-t">
              <h4 className="text-sm font-semibold pt-3">References</h4>
              {profile.references.map((r, i) => (
                <Card key={r.id}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-muted-foreground">
                        #{i + 1}
                      </span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        onClick={() =>
                          onChange({
                            references: profile.references.filter((x) => x.id !== r.id),
                          })
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {(["name", "position", "tel", "email"] as const).map((k) => (
                        <Input
                          key={k}
                          placeholder={k}
                          value={r[k]}
                          onChange={(e) =>
                            onChange({
                              references: profile.references.map((x) =>
                                x.id === r.id ? { ...x, [k]: e.target.value } : x,
                              ),
                            })
                          }
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full gap-1.5"
                onClick={() => {
                  const next: ReferenceItem = {
                    id: uid("ref"),
                    name: "",
                    position: "",
                    tel: "",
                    email: "",
                  };
                  onChange({ references: [next, ...profile.references] });
                }}
              >
                <Plus className="h-4 w-4" />
                Add Reference
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
