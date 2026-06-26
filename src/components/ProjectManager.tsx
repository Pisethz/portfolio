"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, ExternalLink, FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/hooks/use-local-projects";

interface ProjectManagerProps {
  projects: Project[];
  onAdd: (project: Omit<Project, "id" | "createdAt">) => void;
  onUpdate: (id: string, updates: Partial<Omit<Project, "id" | "createdAt">>) => void;
  onDelete: (id: string) => void;
  canEdit?: boolean;
}

function ProjectForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<Project>;
  onSubmit: (data: Omit<Project, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [techInput, setTechInput] = useState(initial?.technologies?.join(", ") ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const technologies = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSubmit({ title, description, technologies, link: link || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. IoT Smart Home System"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what the project does..."
          rows={3}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="technologies">
          Technologies <span className="text-muted-foreground text-xs">(comma separated)</span>
        </Label>
        <Input
          id="technologies"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="Vue.js, PHP, MySQL, IoT"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="link">Project Link</Label>
        <Input
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://..."
        />
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initial?.title ? "Update" : "Add"} Project</Button>
      </div>
    </form>
  );
}

export function ProjectManager({ projects, onAdd, onUpdate, onDelete, canEdit = false }: ProjectManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const editingProject = projects.find((p) => p.id === editingId);

  const handleAdd = (data: Omit<Project, "id" | "createdAt">) => {
    onAdd(data);
    setDialogOpen(false);
  };

  const handleUpdate = (data: Omit<Project, "id" | "createdAt">) => {
    if (editingId) {
      onUpdate(editingId, data);
      setEditingId(null);
      setDialogOpen(false);
    }
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setDialogOpen(true);
  };

  const startAdd = () => {
    setEditingId(null);
    setDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
            06 — Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
            Things I've built
          </h2>
        </div>
        {canEdit && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={startAdd} size="sm" className="rounded-full">
                <Plus className="h-4 w-4 mr-1" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? "Edit Project" : "Add New Project"}
                </DialogTitle>
              </DialogHeader>
              <ProjectForm
                key={editingProject?.id ?? "new"}
                initial={editingProject}
                onSubmit={editingProject ? handleUpdate : handleAdd}
                onCancel={handleCancel}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 p-12 text-center bg-card/30">
          <FolderOpen className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-muted-foreground text-sm">
            {canEdit
              ? "No projects yet. Click Add Project to get started."
              : "No projects to show yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="group flex flex-col hover-lift border-border/60 overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg leading-tight flex items-start justify-between gap-2">
                  <span className="line-clamp-2">{project.title}</span>
                  {canEdit && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => startEdit(project)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => onDelete(project.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-3 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                  >
                    View Project <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
