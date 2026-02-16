import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Upload, Plus, FileSpreadsheet, MapPin, Building2, Users, FolderOpen, FileText, HelpCircle, Pencil, Tag, Download, Link, ExternalLink, Globe, Sun, AlertCircle, LogOut, Loader2, Home, Thermometer, Code, ArrowRight, GitBranch, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Location, Brand, Author, BlogCategory, Blog, Faq, Promotion, CodeSnippet } from "@shared/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type ContentType = "locations" | "brands" | "authors" | "blog-categories" | "blogs" | "faqs" | "promotions";

const contentTypeConfig: Record<ContentType, { label: string; icon: React.ReactNode; fields: string[] }> = {
  locations: { 
    label: "Locations", 
    icon: <MapPin className="h-4 w-4" />,
    fields: ["name", "slug", "city", "province", "address", "postal_code", "phone", "email", "description", "service_area"]
  },
  brands: { 
    label: "Brands", 
    icon: <Building2 className="h-4 w-4" />,
    fields: ["name", "slug", "logo", "description", "website"]
  },
  authors: { 
    label: "Authors", 
    icon: <Users className="h-4 w-4" />,
    fields: ["Name", "Slug", "Collection ID", "Locale ID", "Item ID", "Archived", "Draft", "Created On", "Updated On", "Published On", "Picture", "Short Description", "Bio Summary", "Email", "Facebook Profile Link"]
  },
  "blog-categories": { 
    label: "Blog Categories", 
    icon: <FolderOpen className="h-4 w-4" />,
    fields: ["Name", "Slug", "Collection ID", "Locale ID", "Item ID", "Archived", "Draft", "Created On", "Updated On", "Published On", "Meta Title", "Meta Desc"]
  },
  blogs: { 
    label: "Blogs", 
    icon: <FileText className="h-4 w-4" />,
    fields: ["Name", "Slug", "Collection ID", "Locale ID", "Item ID", "Archived", "Draft", "Created On", "Updated On", "Published On", "Thumbnail", "Banner", "Category", "Read Time", "Author", "Description", "Post Body", "Post Summary", "Treding Blogs", "Featured Blog", "Popular Blogs", "Meta title", "Meta desc"]
  },
  faqs: { 
    label: "FAQs", 
    icon: <HelpCircle className="h-4 w-4" />,
    fields: ["question", "answer", "category", "sort_order"]
  },
  promotions: { 
    label: "Promotions", 
    icon: <Tag className="h-4 w-4" />,
    fields: ["title", "description", "province", "link", "link_text", "promo_type", "discount_value", "start_date", "end_date", "sort_order", "is_active", "is_featured"]
  },
};

function CSVUploadDialog({ contentType, onSuccess, canEdit = true }: { contentType: ContentType; onSuccess: () => void; canEdit?: boolean }) {
  if (!canEdit) return null;
  const [csvContent, setCsvContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async (csv: string) => {
      const response = await fetch(`/api/${contentType}/csv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv }),
      });
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    },
    onSuccess: (data) => {
      toast({ title: "Success", description: `Imported ${data.imported} records` });
      setCsvContent("");
      setIsOpen(false);
      onSuccess();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to import CSV", variant: "destructive" });
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsvContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const config = contentTypeConfig[contentType];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" data-testid={`button-upload-${contentType}`}>
          <Upload className="mr-2 h-4 w-4" />
          Upload CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload {config.label} CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file with the following columns: {config.fields.join(", ")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="csv-file">Select CSV File</Label>
            <Input 
              id="csv-file" 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload}
              data-testid={`input-file-${contentType}`}
            />
          </div>
          <div>
            <Label htmlFor="csv-content">Or paste CSV content</Label>
            <Textarea
              id="csv-content"
              value={csvContent}
              onChange={(e) => setCsvContent(e.target.value)}
              placeholder={config.fields.join(",") + "\nvalue1,value2,..."}
              rows={10}
              data-testid={`textarea-csv-${contentType}`}
            />
          </div>
          <Button 
            onClick={() => uploadMutation.mutate(csvContent)}
            disabled={!csvContent || uploadMutation.isPending}
            className="w-full"
            data-testid={`button-import-${contentType}`}
          >
            {uploadMutation.isPending ? "Importing..." : "Import CSV"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function escapeCSVField(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatDateForCSV(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  columns: { key: keyof T; label: string }[],
  filename: string
): void {
  if (!data || data.length === 0) return;
  
  const headers = columns.map(col => escapeCSVField(col.label));
  const headerRow = headers.join(",");
  
  const rows = data.map(item => {
    return columns.map(col => {
      const value = item[col.key];
      if (value instanceof Date || (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value))) {
        return escapeCSVField(formatDateForCSV(value as Date | string));
      }
      if (typeof value === "boolean") {
        return value ? "true" : "false";
      }
      return escapeCSVField(value);
    }).join(",");
  });
  
  const csvContent = [headerRow, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function CSVExportButton<T extends Record<string, unknown>>({
  contentType,
  data,
  columns,
}: {
  contentType: ContentType;
  data: T[];
  columns: { key: keyof T; label: string }[];
}) {
  const { toast } = useToast();

  const handleExport = () => {
    if (!data || data.length === 0) {
      toast({ title: "No data", description: "No data available to export", variant: "destructive" });
      return;
    }
    exportToCSV(data, columns, contentType);
    toast({ title: "Success", description: `Exported ${data.length} records to CSV` });
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleExport}
      disabled={!data || data.length === 0}
      data-testid={`button-export-${contentType}`}
    >
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  );
}

function EditDialog<T extends { id: string }>({
  item,
  columns,
  contentType,
  onSave,
}: {
  item: T;
  columns: { key: keyof T; label: string }[];
  contentType: ContentType;
  onSave: (id: string, data: Partial<T>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleOpen = () => {
    const initial: Record<string, string> = {};
    columns.forEach((col) => {
      const value = item[col.key];
      initial[String(col.key)] = value != null ? String(value) : "";
    });
    setFormData(initial);
    setIsOpen(true);
  };

  const handleSave = () => {
    onSave(item.id, formData as Partial<T>);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpen}
          data-testid={`button-edit-${contentType}-${item.id}`}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Entry</DialogTitle>
          <DialogDescription>
            Update the fields below and save your changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {columns.map((col) => (
            <div key={String(col.key)} className="grid gap-2">
              <Label htmlFor={String(col.key)}>{col.label}</Label>
              {String(col.key).includes("Body") || String(col.key).includes("description") || String(col.key).includes("answer") ? (
                <Textarea
                  id={String(col.key)}
                  value={formData[String(col.key)] || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [String(col.key)]: e.target.value }))
                  }
                  rows={4}
                  data-testid={`input-edit-${String(col.key)}`}
                />
              ) : (
                <Input
                  id={String(col.key)}
                  value={formData[String(col.key)] || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [String(col.key)]: e.target.value }))
                  }
                  data-testid={`input-edit-${String(col.key)}`}
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} data-testid="button-save-edit">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ContentTable<T extends { id: string }>({ 
  contentType, 
  data, 
  columns,
  onDelete,
  onEdit,
  canEdit = true,
}: { 
  contentType: ContentType;
  data: T[];
  columns: { key: keyof T; label: string }[];
  onDelete: (id: string) => void;
  onEdit: (id: string, data: Partial<T>) => void;
  canEdit?: boolean;
}) {
  const truncateText = (text: string, maxLength: number = 30) => {
    if (!text || text === "null" || text === "undefined") return "-";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="border rounded-md">
      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={String(col.key)} className="whitespace-nowrap px-4 py-3 font-semibold min-w-[140px]">
                    {col.label}
                  </TableHead>
                ))}
                {canEdit && (
                  <TableHead className="whitespace-nowrap px-4 py-3 font-semibold sticky right-0 bg-background border-l">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(!data || data.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground py-8">
                    No data available. Upload a CSV to get started.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id} data-testid={`row-${contentType}-${item.id}`} className="hover:bg-muted/50">
                    {columns.map((col) => (
                      <TableCell key={String(col.key)} className="whitespace-nowrap px-4 py-2 min-w-[140px]">
                        <span 
                          title={String(item[col.key] ?? "")}
                          className="block max-w-[200px] overflow-hidden text-ellipsis"
                        >
                          {truncateText(String(item[col.key] ?? "-"))}
                        </span>
                      </TableCell>
                    ))}
                    {canEdit && (
                      <TableCell className="whitespace-nowrap px-4 py-2 sticky right-0 bg-background border-l">
                        <div className="flex items-center gap-1">
                          <EditDialog
                            item={item}
                            columns={columns}
                            contentType={contentType}
                            onSave={onEdit}
                          />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                data-testid={`button-delete-${contentType}-${item.id}`}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete this entry.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => onDelete(item.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  data-testid={`button-confirm-delete-${contentType}-${item.id}`}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<ContentType | "quick-links" | "technical">("locations");
  const [showAddSnippet, setShowAddSnippet] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<CodeSnippet | null>(null);
  const [newSnippet, setNewSnippet] = useState({ name: "", location: "head", code: "", description: "", isActive: true, priority: 0 });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: session, isLoading: sessionLoading } = useQuery<{ authenticated: boolean; email?: string; role?: string }>({
    queryKey: ["/api/auth/session"],
    queryFn: () => fetch("/api/auth/session").then(r => r.json()),
  });

  const isAdmin = session?.role === "admin";
  const isViewer = session?.role === "viewer";

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("Logout failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/session"] });
      setLocation("/admin/login");
    },
  });

  const { data: locations = [] } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
    queryFn: () => fetch("/api/locations").then(r => r.json()),
  });

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
    queryFn: () => fetch("/api/brands").then(r => r.json()),
  });

  const { data: authors = [] } = useQuery<Author[]>({
    queryKey: ["/api/authors"],
    queryFn: () => fetch("/api/authors").then(r => r.json()),
  });

  const { data: blogCategories = [] } = useQuery<BlogCategory[]>({
    queryKey: ["/api/blog-categories"],
    queryFn: () => fetch("/api/blog-categories").then(r => r.json()),
  });

  const { data: blogs = [] } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
    queryFn: () => fetch("/api/blogs").then(r => r.json()),
  });

  const { data: faqs = [] } = useQuery<Faq[]>({
    queryKey: ["/api/faqs"],
    queryFn: () => fetch("/api/faqs").then(r => r.json()),
  });

  const { data: promotions = [] } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
    queryFn: () => fetch("/api/promotions").then(r => r.json()),
  });

  const { data: codeSnippets = [] } = useQuery<CodeSnippet[]>({
    queryKey: ["/api/code-snippets"],
    queryFn: () => fetch("/api/code-snippets").then(r => r.json()),
  });

  const createSnippetMutation = useMutation({
    mutationFn: async (snippet: typeof newSnippet) => {
      const response = await fetch("/api/code-snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(snippet),
      });
      if (!response.ok) throw new Error("Failed to create snippet");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/code-snippets"] });
      setShowAddSnippet(false);
      setNewSnippet({ name: "", location: "head", code: "", description: "", isActive: true, priority: 0 });
      toast({ title: "Success", description: "Code snippet created" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create code snippet", variant: "destructive" });
    },
  });

  const updateSnippetMutation = useMutation({
    mutationFn: async ({ id, ...data }: CodeSnippet) => {
      const response = await fetch(`/api/code-snippets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update snippet");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/code-snippets"] });
      setEditingSnippet(null);
      toast({ title: "Success", description: "Code snippet updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update code snippet", variant: "destructive" });
    },
  });

  const deleteSnippetMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/code-snippets/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete snippet");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/code-snippets"] });
      toast({ title: "Success", description: "Code snippet deleted" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete code snippet", variant: "destructive" });
    },
  });

  const toggleSnippetMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const response = await fetch(`/api/code-snippets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      if (!response.ok) throw new Error("Failed to toggle snippet");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/code-snippets"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: ContentType; id: string }) => {
      const response = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
    },
    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries({ queryKey: [`/api/${type}`] });
      toast({ title: "Success", description: "Item deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete item", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ type, id, data }: { type: ContentType; id: string; data: Record<string, unknown> }) => {
      const response = await fetch(`/api/${type}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Update failed");
      return response.json();
    },
    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries({ queryKey: [`/api/${type}`] });
      toast({ title: "Success", description: "Item updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update item", variant: "destructive" });
    },
  });

  const handleEdit = (type: ContentType) => (id: string, data: Record<string, unknown>) => {
    updateMutation.mutate({ type, id, data });
  };

  const handleRefresh = (type: ContentType) => {
    queryClient.invalidateQueries({ queryKey: [`/api/${type}`] });
  };

  useEffect(() => {
    if (!sessionLoading && !session?.authenticated) {
      setLocation("/admin/login");
    }
  }, [session, sessionLoading, setLocation]);

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#8dc63f]" />
      </div>
    );
  }

  if (!session?.authenticated) {
    return null;
  }

  const stats = [
    { label: "Locations", count: locations.length, icon: <MapPin className="h-5 w-5" /> },
    { label: "Brands", count: brands.length, icon: <Building2 className="h-5 w-5" /> },
    { label: "Authors", count: authors.length, icon: <Users className="h-5 w-5" /> },
    { label: "Categories", count: blogCategories.length, icon: <FolderOpen className="h-5 w-5" /> },
    { label: "Blogs", count: blogs.length, icon: <FileText className="h-5 w-5" /> },
    { label: "FAQs", count: faqs.length, icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight" data-testid="text-admin-title">Content Management</h1>
            <p className="text-muted-foreground mt-2">Manage your website content with CSV uploads</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isAdmin ? "default" : "secondary"} data-testid="badge-role">
              {isAdmin ? "Admin" : "Viewer"}
            </Badge>
            <span className="text-sm text-muted-foreground" data-testid="text-admin-email">
              {session?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} data-testid={`card-stat-${stat.label.toLowerCase()}`}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.count}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ContentType | "quick-links" | "technical")} className="space-y-4">
          <TabsList className="grid grid-cols-4 lg:grid-cols-9 w-full">
            {(Object.entries(contentTypeConfig) as [ContentType, typeof contentTypeConfig[ContentType]][]).map(([key, config]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2" data-testid={`tab-${key}`}>
                {config.icon}
                <span className="hidden sm:inline">{config.label}</span>
              </TabsTrigger>
            ))}
            <TabsTrigger value="quick-links" className="flex items-center gap-2" data-testid="tab-quick-links">
              <Link className="h-4 w-4" />
              <span className="hidden sm:inline">Links</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2" data-testid="tab-technical">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Technical</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="locations">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Locations</CardTitle>
                  <CardDescription>Service locations and coverage areas</CardDescription>
                </div>
                <div className="flex gap-2">
                  <CSVExportButton
                    contentType="locations"
                    data={locations}
                    columns={[
                      { key: "name", label: "Name" },
                      { key: "slug", label: "Slug" },
                      { key: "city", label: "City" },
                      { key: "province", label: "Province" },
                      { key: "address", label: "Address" },
                      { key: "postalCode", label: "Postal Code" },
                      { key: "phone", label: "Phone" },
                      { key: "email", label: "Email" },
                      { key: "description", label: "Description" },
                      { key: "serviceArea", label: "Service Area" },
                      { key: "isActive", label: "Is Active" },
                    ]}
                  />
                  <CSVUploadDialog contentType="locations" onSuccess={() => handleRefresh("locations")} canEdit={isAdmin} />
                </div>
              </CardHeader>
              <CardContent>
                <ContentTable
                  contentType="locations"
                  data={locations}
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "city", label: "City" },
                    { key: "province", label: "Province" },
                    { key: "phone", label: "Phone" },
                  ]}
                  onDelete={(id) => deleteMutation.mutate({ type: "locations", id })}
                  onEdit={handleEdit("locations")}
                  canEdit={isAdmin}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brands">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Brands</CardTitle>
                  <CardDescription>HVAC equipment brands we service</CardDescription>
                </div>
                <div className="flex gap-2">
                  <CSVExportButton
                    contentType="brands"
                    data={brands}
                    columns={[
                      { key: "name", label: "Name" },
                      { key: "slug", label: "Slug" },
                      { key: "logo", label: "Logo" },
                      { key: "description", label: "Description" },
                      { key: "website", label: "Website" },
                    ]}
                  />
                  <CSVUploadDialog contentType="brands" onSuccess={() => handleRefresh("brands")} canEdit={isAdmin} />
                </div>
              </CardHeader>
              <CardContent>
                <ContentTable
                  contentType="brands"
                  data={brands}
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "website", label: "Website" },
                    { key: "isActive", label: "Active" },
                  ]}
                  onDelete={(id) => deleteMutation.mutate({ type: "brands", id })}
                  onEdit={handleEdit("brands")}
                  canEdit={isAdmin}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authors">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Authors</CardTitle>
                  <CardDescription>Blog post authors and contributors</CardDescription>
                </div>
                <div className="flex gap-2">
                  <CSVExportButton
                    contentType="authors"
                    data={authors}
                    columns={[
                      { key: "name", label: "Name" },
                      { key: "slug", label: "Slug" },
                      { key: "collectionId", label: "Collection ID" },
                      { key: "localeId", label: "Locale ID" },
                      { key: "itemId", label: "Item ID" },
                      { key: "archived", label: "Archived" },
                      { key: "draft", label: "Draft" },
                      { key: "createdAt", label: "Created On" },
                      { key: "updatedAt", label: "Updated On" },
                      { key: "publishedAt", label: "Published On" },
                      { key: "picture", label: "Picture" },
                      { key: "shortDescription", label: "Short Description" },
                      { key: "bioSummary", label: "Bio Summary" },
                      { key: "email", label: "Email" },
                      { key: "facebookProfileLink", label: "Facebook Profile Link" },
                    ]}
                  />
                  <CSVUploadDialog contentType="authors" onSuccess={() => handleRefresh("authors")} canEdit={isAdmin} />
                </div>
              </CardHeader>
              <CardContent>
                <ContentTable
                  contentType="authors"
                  data={authors}
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "slug", label: "Slug" },
                    { key: "email", label: "Email" },
                    { key: "picture", label: "Picture" },
                    { key: "shortDescription", label: "Short Description" },
                    { key: "bioSummary", label: "Bio Summary" },
                    { key: "facebookProfileLink", label: "Facebook" },
                    { key: "collectionId", label: "Collection ID" },
                    { key: "localeId", label: "Locale ID" },
                    { key: "itemId", label: "Item ID" },
                    { key: "archived", label: "Archived" },
                    { key: "draft", label: "Draft" },
                    { key: "createdAt", label: "Created On" },
                    { key: "updatedAt", label: "Updated On" },
                    { key: "publishedAt", label: "Published On" },
                    { key: "isActive", label: "Active" },
                  ]}
                  onDelete={(id) => deleteMutation.mutate({ type: "authors", id })}
                  onEdit={handleEdit("authors")}
                  canEdit={isAdmin}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog-categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Blog Categories</CardTitle>
                  <CardDescription>Categories for organizing blog content</CardDescription>
                </div>
                <div className="flex gap-2">
                  <CSVExportButton
                    contentType="blog-categories"
                    data={blogCategories}
                    columns={[
                      { key: "name", label: "Name" },
                      { key: "slug", label: "Slug" },
                      { key: "collectionId", label: "Collection ID" },
                      { key: "localeId", label: "Locale ID" },
                      { key: "itemId", label: "Item ID" },
                      { key: "archived", label: "Archived" },
                      { key: "draft", label: "Draft" },
                      { key: "createdAt", label: "Created On" },
                      { key: "updatedAt", label: "Updated On" },
                      { key: "publishedAt", label: "Published On" },
                      { key: "metaTitle", label: "Meta Title" },
                      { key: "metaDesc", label: "Meta Desc" },
                    ]}
                  />
                  <CSVUploadDialog contentType="blog-categories" onSuccess={() => handleRefresh("blog-categories")} canEdit={isAdmin} />
                </div>
              </CardHeader>
              <CardContent>
                <ContentTable
                  contentType="blog-categories"
                  data={blogCategories}
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "slug", label: "Slug" },
                    { key: "collectionId", label: "Collection ID" },
                    { key: "localeId", label: "Locale ID" },
                    { key: "itemId", label: "Item ID" },
                    { key: "archived", label: "Archived" },
                    { key: "draft", label: "Draft" },
                    { key: "createdAt", label: "Created On" },
                    { key: "updatedAt", label: "Updated On" },
                    { key: "publishedAt", label: "Published On" },
                    { key: "metaTitle", label: "Meta Title" },
                    { key: "metaDesc", label: "Meta Desc" },
                  ]}
                  onDelete={(id) => deleteMutation.mutate({ type: "blog-categories", id })}
                  onEdit={handleEdit("blog-categories")}
                  canEdit={isAdmin}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blogs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Blogs</CardTitle>
                  <CardDescription>Blog posts and articles</CardDescription>
                </div>
                <div className="flex gap-2">
                  <CSVExportButton
                    contentType="blogs"
                    data={blogs}
                    columns={[
                      { key: "title", label: "Name" },
                      { key: "slug", label: "Slug" },
                      { key: "collectionId", label: "Collection ID" },
                      { key: "localeId", label: "Locale ID" },
                      { key: "itemId", label: "Item ID" },
                      { key: "archived", label: "Archived" },
                      { key: "draft", label: "Draft" },
                      { key: "createdAt", label: "Created On" },
                      { key: "updatedAt", label: "Updated On" },
                      { key: "publishedAt", label: "Published On" },
                      { key: "thumbnail", label: "Thumbnail" },
                      { key: "banner", label: "Banner" },
                      { key: "category", label: "Category" },
                      { key: "readTime", label: "Read Time" },
                      { key: "author", label: "Author" },
                      { key: "description", label: "Description" },
                      { key: "postBody", label: "Post Body" },
                      { key: "postSummary", label: "Post Summary" },
                      { key: "trendingBlogs", label: "Trending Blogs" },
                      { key: "featuredBlog", label: "Featured Blogs" },
                      { key: "metaTitle", label: "Meta Title" },
                      { key: "metaDesc", label: "Meta Desc" },
                    ]}
                  />
                  <CSVUploadDialog contentType="blogs" onSuccess={() => handleRefresh("blogs")} canEdit={isAdmin} />
                </div>
              </CardHeader>
              <CardContent>
                <ContentTable
                  contentType="blogs"
                  data={blogs}
                  columns={[
                    { key: "title", label: "Name" },
                    { key: "slug", label: "Slug" },
                    { key: "collectionId", label: "Collection ID" },
                    { key: "localeId", label: "Locale ID" },
                    { key: "itemId", label: "Item ID" },
                    { key: "archived", label: "Archived" },
                    { key: "draft", label: "Draft" },
                    { key: "createdAt", label: "Created On" },
                    { key: "updatedAt", label: "Updated On" },
                    { key: "publishedAt", label: "Published On" },
                    { key: "thumbnail", label: "Thumbnail" },
                    { key: "banner", label: "Banner" },
                    { key: "category", label: "Category" },
                    { key: "readTime", label: "Read Time" },
                    { key: "author", label: "Author" },
                    { key: "description", label: "Description" },
                    { key: "postBody", label: "Post Body" },
                    { key: "postSummary", label: "Post Summary" },
                    { key: "trendingBlogs", label: "Trending Blogs" },
                    { key: "featuredBlog", label: "Featured Blogs" },
                    { key: "metaTitle", label: "Meta Title" },
                    { key: "metaDesc", label: "Meta Desc" },
                  ]}
                  onDelete={(id) => deleteMutation.mutate({ type: "blogs", id })}
                  onEdit={handleEdit("blogs")}
                  canEdit={isAdmin}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faqs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>FAQs</CardTitle>
                  <CardDescription>Frequently asked questions</CardDescription>
                </div>
                <div className="flex gap-2">
                  <CSVExportButton
                    contentType="faqs"
                    data={faqs}
                    columns={[
                      { key: "question", label: "Question" },
                      { key: "answer", label: "Answer" },
                      { key: "category", label: "Category" },
                      { key: "sortOrder", label: "Sort Order" },
                    ]}
                  />
                  <CSVUploadDialog contentType="faqs" onSuccess={() => handleRefresh("faqs")} canEdit={isAdmin} />
                </div>
              </CardHeader>
              <CardContent>
                <ContentTable
                  contentType="faqs"
                  data={faqs}
                  columns={[
                    { key: "question", label: "Question" },
                    { key: "category", label: "Category" },
                    { key: "sortOrder", label: "Order" },
                  ]}
                  onDelete={(id) => deleteMutation.mutate({ type: "faqs", id })}
                  onEdit={handleEdit("faqs")}
                  canEdit={isAdmin}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promotions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Promotions</CardTitle>
                  <CardDescription>Specials and promotional offers by province</CardDescription>
                </div>
                <div className="flex gap-2">
                  <CSVExportButton
                    contentType="promotions"
                    data={promotions}
                    columns={[
                      { key: "title", label: "Title" },
                      { key: "description", label: "Description" },
                      { key: "province", label: "Province" },
                      { key: "link", label: "Link" },
                      { key: "linkText", label: "Link Text" },
                      { key: "promoType", label: "Promo Type" },
                      { key: "discountValue", label: "Discount Value" },
                      { key: "startDate", label: "Start Date" },
                      { key: "endDate", label: "End Date" },
                      { key: "sortOrder", label: "Sort Order" },
                      { key: "isActive", label: "Is Active" },
                      { key: "isFeatured", label: "Is Featured" },
                    ]}
                  />
                  <CSVUploadDialog contentType="promotions" onSuccess={() => handleRefresh("promotions")} canEdit={isAdmin} />
                </div>
              </CardHeader>
              <CardContent>
                <ContentTable
                  contentType="promotions"
                  data={promotions}
                  columns={[
                    { key: "title", label: "Title" },
                    { key: "province", label: "Province" },
                    { key: "isActive", label: "Active" },
                    { key: "isFeatured", label: "Featured" },
                    { key: "sortOrder", label: "Order" },
                  ]}
                  onDelete={(id) => deleteMutation.mutate({ type: "promotions", id })}
                  onEdit={handleEdit("promotions")}
                  canEdit={isAdmin}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quick-links">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Quick Links
                </CardTitle>
                <CardDescription>Direct links to all editable pages, locations, and landing pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Location Pages */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-[#8dc63f]" />
                    Location Pages (Heat Pump Experts)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {locations.map((loc) => (
                      <a
                        key={loc.id}
                        href={`/heat-pump-experts/${loc.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:border-[#8dc63f] hover:bg-slate-50 transition-all group"
                        data-testid={`link-location-${loc.slug}`}
                      >
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#8dc63f]" />
                        <span className="text-sm font-medium">{loc.name}</span>
                        <Badge variant="outline" className="ml-auto text-xs">{loc.province}</Badge>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Insulation Landing Pages */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Home className="h-5 w-5 text-orange-500" />
                    Insulation Rebate Landing Pages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: "National Insulation", path: "/lp/national-insulation-rebates" },
                      { name: "NS Insulation", path: "/lp/nova-scotia-insulation-rebates" },
                      { name: "NB Insulation", path: "/lp/new-brunswick-insulation-rebates" },
                      { name: "NL Insulation", path: "/lp/newfoundland-labrador-insulation-rebates" },
                      { name: "BC Insulation", path: "/lp/british-columbia-insulation-rebates" },
                      { name: "PEI Insulation", path: "/lp/prince-edward-island-insulation-rebates" },
                    ].map((page) => (
                      <a
                        key={page.path}
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:border-orange-500 hover:bg-orange-50 transition-all group"
                        data-testid={`link-insulation-${page.path.replace(/\//g, '-')}`}
                      >
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-orange-500" />
                        <span className="text-sm font-medium">{page.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Landing Pages */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-[#1E5AA8]" />
                    Landing Pages & Special Pages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: "HYGN HY-RANGER", path: "/hygn" },
                      { name: "Chilliwack", path: "/chilliwack" },
                      { name: "Sweepstakes", path: "/sweepstakes" },
                      { name: "$2/Day Heat Pump", path: "/2-a-day" },
                      { name: "Oil to Heat Pump ($22K)", path: "/lp/oil-to-heat-pump-rebate-up-to-22k" },
                      { name: "Oil to Heat Pump ($15K)", path: "/lp/oil-to-heat-pump-rebate-up-to-15k" },
                      { name: "Cozy Subscription LP", path: "/lp/cozy-subscription" },
                      { name: "PIEER Program LP", path: "/lp/pieer-program" },
                      { name: "Refurbished Heat Pumps LP", path: "/lp/refurbished-heat-pumps" },
                      { name: "New Home $15K Rebate LP", path: "/lp/new-home-15k-rebate" },
                      { name: "Specials & Promotions", path: "/specials-promotions" },
                      { name: "NS Specials", path: "/specials/nova-scotia" },
                      { name: "NB Specials", path: "/specials/new-brunswick" },
                      { name: "PEI Specials", path: "/specials/prince-edward-island" },
                      { name: "NL Specials", path: "/specials/newfoundland" },
                      { name: "BC Specials", path: "/specials/british-columbia" },
                      { name: "Provincial Incentives", path: "/provincial-incentives" },
                      { name: "Review Our Services", path: "/review-our-services" },
                      { name: "Google Reviews", path: "/google-reviews-page" },
                    ].map((page) => (
                      <a
                        key={page.path}
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:border-[#1E5AA8] hover:bg-slate-50 transition-all group"
                        data-testid={`link-landing-${page.path.replace(/\//g, '-')}`}
                      >
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#1E5AA8]" />
                        <span className="text-sm font-medium">{page.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Service Pages */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Building2 className="h-5 w-5 text-[#8dc63f]" />
                    Service Pages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: "Mini-Split Heat Pumps", path: "/services/mini-split-heat-pumps" },
                      { name: "Ducted Central Heat Pumps", path: "/services/ducted-central-heat-pumps" },
                      { name: "Dual-Fuel Heating", path: "/services/dual-fuel-heating-systems" },
                      { name: "Geothermal Heat Pumps", path: "/services/geothermal-heat-pumps" },
                      { name: "Heat Pumps & A/C", path: "/services/heat-pumps-and-air-conditioning" },
                      { name: "Water Heaters", path: "/services/water-heaters" },
                      { name: "Generators", path: "/services/generators" },
                      { name: "Air Conditioning", path: "/services/air-conditioning" },
                      { name: "Solar Energy", path: "/services/solar-energy" },
                      { name: "Residential Solar", path: "/services/residential-solar" },
                      { name: "Commercial Solar", path: "/services/commercial-solar" },
                      { name: "Spray Foam Insulation", path: "/services/sprayfoam-insulation" },
                      { name: "Batt & Poly Insulation", path: "/services/batt-poly-insulation" },
                      { name: "Blown-In Insulation", path: "/services/blown-in-insulation" },
                      { name: "Soundproofing", path: "/services/soundproofing" },
                      { name: "Indoor Air Quality & Ventilation", path: "/services/indoor-air-quality-ventilation" },
                      { name: "Commercial HVAC", path: "/services/commercial-hvac" },
                      { name: "Urban Yeti Appliances", path: "/services/urban-yeti-appliances" },
                      { name: "Peak Thermostat", path: "/services/peak-thermostat" },
                      { name: "Commercial Services", path: "/services/commercial-services" },
                      { name: "Service Yeti (Maintenance)", path: "/services/maintenance-service-yeti" },
                    ].map((page) => (
                      <a
                        key={page.path}
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:border-[#8dc63f] hover:bg-slate-50 transition-all group"
                        data-testid={`link-service-${page.path.replace(/\//g, '-')}`}
                      >
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#8dc63f]" />
                        <span className="text-sm font-medium">{page.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Residential Solar Location Pages (Solar Experts) */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    Residential Solar Location Pages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: "Langley", province: "BC", slug: "langley" },
                      { name: "Surrey", province: "BC", slug: "surrey" },
                      { name: "Abbotsford", province: "BC", slug: "abbotsford" },
                      { name: "Kamloops", province: "BC", slug: "kamloops" },
                      { name: "Kelowna", province: "BC", slug: "kelowna" },
                      { name: "Victoria", province: "BC", slug: "victoria" },
                      { name: "Moncton", province: "NB", slug: "moncton" },
                      { name: "Saint John", province: "NB", slug: "saint-john" },
                      { name: "Fredericton", province: "NB", slug: "fredericton" },
                      { name: "Tracadie-Sheila", province: "NB", slug: "tracadie-sheila" },
                      { name: "Paradise", province: "NL", slug: "paradise" },
                      { name: "Dartmouth", province: "NS", slug: "dartmouth" },
                      { name: "Sydney", province: "NS", slug: "sydney" },
                      { name: "New Glasgow", province: "NS", slug: "new-glasgow" },
                      { name: "Kentville", province: "NS", slug: "kentville" },
                      { name: "Bridgewater", province: "NS", slug: "bridgewater" },
                      { name: "Charlottetown", province: "PEI", slug: "charlottetown" },
                    ].map((loc) => (
                      <a
                        key={loc.slug}
                        href={`/solar-experts/${loc.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:border-yellow-500 hover:bg-yellow-50 transition-all group"
                        data-testid={`link-solar-experts-${loc.slug}`}
                      >
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-yellow-500" />
                        <span className="text-sm font-medium">{loc.name}</span>
                        <Badge variant="outline" className="ml-auto text-xs">{loc.province}</Badge>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Commercial Solar Location Pages */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Building2 className="h-5 w-5 text-[#1E5AA8]" />
                    Commercial Solar Location Pages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: "Abbotsford", province: "BC", slug: "abbotsford" },
                      { name: "Surrey", province: "BC", slug: "surrey" },
                      { name: "Langley", province: "BC", slug: "langley" },
                      { name: "Victoria", province: "BC", slug: "victoria" },
                      { name: "Kelowna", province: "BC", slug: "kelowna" },
                      { name: "Kamloops", province: "BC", slug: "kamloops" },
                      { name: "Moncton", province: "NB", slug: "moncton" },
                      { name: "Saint John", province: "NB", slug: "saint-john" },
                      { name: "Fredericton", province: "NB", slug: "fredericton" },
                      { name: "Tracadie-Sheila", province: "NB", slug: "tracadie-sheila" },
                      { name: "Paradise", province: "NL", slug: "paradise" },
                      { name: "Kentville", province: "NS", slug: "kentville" },
                      { name: "Dartmouth", province: "NS", slug: "dartmouth" },
                      { name: "New Glasgow", province: "NS", slug: "new-glasgow" },
                      { name: "Bridgewater", province: "NS", slug: "bridgewater" },
                      { name: "Sydney", province: "NS", slug: "sydney" },
                      { name: "Charlottetown", province: "PEI", slug: "charlottetown" },
                    ].map((loc) => (
                      <a
                        key={loc.slug}
                        href={`/services/commercial-solar/${loc.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:border-[#1E5AA8] hover:bg-blue-50 transition-all group"
                        data-testid={`link-commercial-solar-${loc.slug}`}
                      >
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#1E5AA8]" />
                        <span className="text-sm font-medium">{loc.name}</span>
                        <Badge variant="outline" className="ml-auto text-xs">{loc.province}</Badge>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Air Conditioning Location Pages */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Thermometer className="h-5 w-5 text-cyan-500" />
                    Air Conditioning Location Pages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: "Abbotsford", province: "BC", slug: "abbotsford" },
                      { name: "Surrey", province: "BC", slug: "surrey" },
                      { name: "Langley", province: "BC", slug: "langley" },
                      { name: "Victoria", province: "BC", slug: "victoria" },
                      { name: "Kelowna", province: "BC", slug: "kelowna" },
                      { name: "Kamloops", province: "BC", slug: "kamloops" },
                      { name: "Moncton", province: "NB", slug: "moncton" },
                      { name: "Saint John", province: "NB", slug: "saint-john" },
                      { name: "Fredericton", province: "NB", slug: "fredericton" },
                      { name: "Tracadie-Sheila", province: "NB", slug: "tracadie-sheila" },
                      { name: "Paradise", province: "NL", slug: "paradise" },
                      { name: "Kentville", province: "NS", slug: "kentville" },
                      { name: "Dartmouth", province: "NS", slug: "dartmouth" },
                      { name: "New Glasgow", province: "NS", slug: "new-glasgow" },
                      { name: "Bridgewater", province: "NS", slug: "bridgewater" },
                      { name: "Sydney", province: "NS", slug: "sydney" },
                      { name: "Charlottetown", province: "PEI", slug: "charlottetown" },
                    ].map((loc) => (
                      <a
                        key={loc.slug}
                        href={`/air-conditioning-experts/${loc.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:border-cyan-500 hover:bg-cyan-50 transition-all group"
                        data-testid={`link-ac-experts-${loc.slug}`}
                      >
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-cyan-500" />
                        <span className="text-sm font-medium">{loc.name}</span>
                        <Badge variant="outline" className="ml-auto text-xs">{loc.province}</Badge>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Sprayfoam Insulation Location Pages */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Home className="h-5 w-5 text-purple-500" />
                    Sprayfoam Insulation Location Pages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: "Abbotsford", province: "BC", slug: "abbotsford" },
                      { name: "Surrey", province: "BC", slug: "surrey" },
                      { name: "Langley", province: "BC", slug: "langley" },
                      { name: "Victoria", province: "BC", slug: "victoria" },
                      { name: "Kelowna", province: "BC", slug: "kelowna" },
                      { name: "Kamloops", province: "BC", slug: "kamloops" },
                      { name: "Moncton", province: "NB", slug: "moncton" },
                      { name: "Saint John", province: "NB", slug: "saint-john" },
                      { name: "Fredericton", province: "NB", slug: "fredericton" },
                      { name: "Tracadie-Sheila", province: "NB", slug: "tracadie-sheila" },
                      { name: "Paradise", province: "NL", slug: "paradise" },
                      { name: "Kentville", province: "NS", slug: "kentville" },
                      { name: "Dartmouth", province: "NS", slug: "dartmouth" },
                      { name: "New Glasgow", province: "NS", slug: "new-glasgow" },
                      { name: "Bridgewater", province: "NS", slug: "bridgewater" },
                      { name: "Sydney", province: "NS", slug: "sydney" },
                      { name: "Charlottetown", province: "PEI", slug: "charlottetown" },
                    ].map((loc) => (
                      <a
                        key={loc.slug}
                        href={`/services/sprayfoam-insulation/${loc.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:border-purple-500 hover:bg-purple-50 transition-all group"
                        data-testid={`link-sprayfoam-${loc.slug}`}
                      >
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-purple-500" />
                        <span className="text-sm font-medium">{loc.name}</span>
                        <Badge variant="outline" className="ml-auto text-xs">{loc.province}</Badge>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Brand Pages */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-amber-500" />
                    Brand Pages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: "GE Heat Pumps", path: "/brands/general-electric-heat-pumps" },
                      { name: "Gridless Heat Pumps", path: "/brands/gridless-heat-pumps" },
                      { name: "Kerr Heat Pumps", path: "/brands/kerr-heat-pumps" },
                      { name: "Mitsubishi Electric", path: "/brands/mitsubishi-electric-heat-pumps" },
                      { name: "LG Heat Pumps", path: "/brands/lg-heat-pumps" },
                    ].map((page) => (
                      <a
                        key={page.path}
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:border-amber-500 hover:bg-amber-50 transition-all group"
                        data-testid={`link-brand-${page.path.replace(/\//g, '-')}`}
                      >
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-amber-500" />
                        <span className="text-sm font-medium">{page.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Main Site Pages */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-slate-600" />
                    Main Site Pages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: "Home", path: "/" },
                      { name: "About Us", path: "/about-us" },
                      { name: "Why Choose Us", path: "/why-choose-us" },
                      { name: "Financing", path: "/financing" },
                      { name: "Contact Us", path: "/contact-us" },
                      { name: "FAQ", path: "/faq" },
                      { name: "Blog", path: "/blog" },
                      { name: "Careers", path: "/careers" },
                      { name: "Kids Club", path: "/kids-club" },
                      { name: "Membership Plans", path: "/membership-plans" },
                      { name: "Referral", path: "/referral" },
                      { name: "Heat Pump Glossary", path: "/heat-pump-glossary" },
                      { name: "Snow Covers", path: "/heat-pump-snow-covers-protect-your-investment" },
                      { name: "App Setup", path: "/app-setup" },
                    ].map((page) => (
                      <a
                        key={page.path}
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border hover:border-slate-400 hover:bg-slate-50 transition-all group"
                        data-testid={`link-main-${page.path.replace(/\//g, '-') || 'home'}`}
                      >
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                        <span className="text-sm font-medium">{page.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* External Domains */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-orange-500" />
                    External Domains & Links
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { name: "Scheduling Portal", url: "https://scheduling.greenfootenergy.ca", desc: "Booking system" },
                      { name: "Main Website", url: "https://greenfootenergy.ca", desc: "Production site" },
                    ].map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg border hover:border-orange-400 hover:bg-orange-50 transition-all group"
                        data-testid={`link-external-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <ExternalLink className="h-5 w-5 text-orange-400 group-hover:text-orange-500" />
                        <div>
                          <span className="text-sm font-medium block">{link.name}</span>
                          <span className="text-xs text-slate-500">{link.desc}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical Tab */}
          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  Technical Overview
                </CardTitle>
                <CardDescription>
                  View all redirects, route configurations, and backend settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Head & Footer Code Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Code className="h-5 w-5 text-[#8dc63f]" />
                      Head & Footer Code
                    </h3>
                    <Dialog open={showAddSnippet} onOpenChange={setShowAddSnippet}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-[#8dc63f] hover:bg-[#7ab535]">
                          <Plus className="h-4 w-4 mr-1" /> Add Code
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add Code Snippet</DialogTitle>
                          <DialogDescription>Add tracking scripts, meta tags, or custom code to your site's head or footer.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Name</Label>
                              <Input 
                                placeholder="e.g., Google Analytics" 
                                value={newSnippet.name}
                                onChange={(e) => setNewSnippet({ ...newSnippet, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Location</Label>
                              <Select value={newSnippet.location} onValueChange={(v) => setNewSnippet({ ...newSnippet, location: v })}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="head">Head (Before &lt;/head&gt;)</SelectItem>
                                  <SelectItem value="footer">Footer (Before &lt;/body&gt;)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label>Description (optional)</Label>
                            <Input 
                              placeholder="What is this code for?" 
                              value={newSnippet.description || ""}
                              onChange={(e) => setNewSnippet({ ...newSnippet, description: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Code</Label>
                            <Textarea 
                              placeholder="<script>...</script>" 
                              className="font-mono text-sm min-h-[200px]"
                              value={newSnippet.code}
                              onChange={(e) => setNewSnippet({ ...newSnippet, code: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Priority (higher = loads first)</Label>
                              <Input 
                                type="number" 
                                value={newSnippet.priority}
                                onChange={(e) => setNewSnippet({ ...newSnippet, priority: parseInt(e.target.value) || 0 })}
                              />
                            </div>
                            <div className="flex items-center gap-2 pt-6">
                              <Switch 
                                checked={newSnippet.isActive}
                                onCheckedChange={(checked) => setNewSnippet({ ...newSnippet, isActive: checked })}
                              />
                              <Label>Active</Label>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowAddSnippet(false)}>Cancel</Button>
                          <Button onClick={() => createSnippetMutation.mutate(newSnippet)} disabled={!newSnippet.name || !newSnippet.code}>
                            Add Snippet
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Head Snippets */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">&lt;head&gt;</Badge>
                      Head Code ({codeSnippets.filter(s => s.location === 'head').length})
                    </h4>
                    <div className="space-y-2">
                      {codeSnippets.filter(s => s.location === 'head').length === 0 ? (
                        <p className="text-sm text-slate-400 italic p-4 bg-slate-50 rounded-lg">No head code snippets yet</p>
                      ) : (
                        codeSnippets.filter(s => s.location === 'head').sort((a, b) => (b.priority || 0) - (a.priority || 0)).map((snippet) => (
                          <div key={snippet.id} className={`flex items-center justify-between p-4 rounded-lg border ${snippet.isActive ? 'bg-white' : 'bg-slate-50 opacity-60'}`}>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{snippet.name}</span>
                                {snippet.priority !== 0 && (
                                  <Badge variant="outline" className="text-xs">Priority: {snippet.priority}</Badge>
                                )}
                                {!snippet.isActive && (
                                  <Badge variant="secondary" className="text-xs">Disabled</Badge>
                                )}
                              </div>
                              {snippet.description && (
                                <p className="text-sm text-slate-500 mt-1">{snippet.description}</p>
                              )}
                              <pre className="text-xs text-slate-400 mt-2 bg-slate-50 p-2 rounded max-h-20 overflow-hidden font-mono">
                                {snippet.code.substring(0, 150)}{snippet.code.length > 150 ? '...' : ''}
                              </pre>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Switch 
                                checked={snippet.isActive ?? false}
                                onCheckedChange={(checked) => toggleSnippetMutation.mutate({ id: snippet.id, isActive: checked })}
                              />
                              <Button variant="ghost" size="sm" onClick={() => setEditingSnippet(snippet)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Code Snippet?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete "{snippet.name}". This cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteSnippetMutation.mutate(snippet.id)} className="bg-red-500 hover:bg-red-600">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Footer Snippets */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">&lt;/body&gt;</Badge>
                      Footer Code ({codeSnippets.filter(s => s.location === 'footer').length})
                    </h4>
                    <div className="space-y-2">
                      {codeSnippets.filter(s => s.location === 'footer').length === 0 ? (
                        <p className="text-sm text-slate-400 italic p-4 bg-slate-50 rounded-lg">No footer code snippets yet</p>
                      ) : (
                        codeSnippets.filter(s => s.location === 'footer').sort((a, b) => (b.priority || 0) - (a.priority || 0)).map((snippet) => (
                          <div key={snippet.id} className={`flex items-center justify-between p-4 rounded-lg border ${snippet.isActive ? 'bg-white' : 'bg-slate-50 opacity-60'}`}>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{snippet.name}</span>
                                {snippet.priority !== 0 && (
                                  <Badge variant="outline" className="text-xs">Priority: {snippet.priority}</Badge>
                                )}
                                {!snippet.isActive && (
                                  <Badge variant="secondary" className="text-xs">Disabled</Badge>
                                )}
                              </div>
                              {snippet.description && (
                                <p className="text-sm text-slate-500 mt-1">{snippet.description}</p>
                              )}
                              <pre className="text-xs text-slate-400 mt-2 bg-slate-50 p-2 rounded max-h-20 overflow-hidden font-mono">
                                {snippet.code.substring(0, 150)}{snippet.code.length > 150 ? '...' : ''}
                              </pre>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Switch 
                                checked={snippet.isActive ?? false}
                                onCheckedChange={(checked) => toggleSnippetMutation.mutate({ id: snippet.id, isActive: checked })}
                              />
                              <Button variant="ghost" size="sm" onClick={() => setEditingSnippet(snippet)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Code Snippet?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete "{snippet.name}". This cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteSnippetMutation.mutate(snippet.id)} className="bg-red-500 hover:bg-red-600">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Edit Snippet Dialog */}
                  <Dialog open={!!editingSnippet} onOpenChange={(open) => !open && setEditingSnippet(null)}>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Code Snippet</DialogTitle>
                      </DialogHeader>
                      {editingSnippet && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Name</Label>
                              <Input 
                                value={editingSnippet.name}
                                onChange={(e) => setEditingSnippet({ ...editingSnippet, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Location</Label>
                              <Select value={editingSnippet.location} onValueChange={(v) => setEditingSnippet({ ...editingSnippet, location: v })}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="head">Head (Before &lt;/head&gt;)</SelectItem>
                                  <SelectItem value="footer">Footer (Before &lt;/body&gt;)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label>Description (optional)</Label>
                            <Input 
                              value={editingSnippet.description || ""}
                              onChange={(e) => setEditingSnippet({ ...editingSnippet, description: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Code</Label>
                            <Textarea 
                              className="font-mono text-sm min-h-[200px]"
                              value={editingSnippet.code}
                              onChange={(e) => setEditingSnippet({ ...editingSnippet, code: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Priority (higher = loads first)</Label>
                              <Input 
                                type="number" 
                                value={editingSnippet.priority || 0}
                                onChange={(e) => setEditingSnippet({ ...editingSnippet, priority: parseInt(e.target.value) || 0 })}
                              />
                            </div>
                            <div className="flex items-center gap-2 pt-6">
                              <Switch 
                                checked={editingSnippet.isActive ?? true}
                                onCheckedChange={(checked) => setEditingSnippet({ ...editingSnippet, isActive: checked })}
                              />
                              <Label>Active</Label>
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingSnippet(null)}>Cancel</Button>
                        <Button onClick={() => editingSnippet && updateSnippetMutation.mutate(editingSnippet)}>
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Redirects Section */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <GitBranch className="h-5 w-5 text-orange-500" />
                    301 Redirects (SEO Preserved)
                  </h3>
                  <div className="bg-slate-50 rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-100">
                          <TableHead className="font-semibold">From URL</TableHead>
                          <TableHead className="w-12"></TableHead>
                          <TableHead className="font-semibold">To URL</TableHead>
                          <TableHead className="font-semibold">Purpose</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { from: "/services/spray-foam-insulation", to: "/services/sprayfoam-insulation", purpose: "URL normalization" },
                          { from: "/spray-foam/insulation", to: "/services/sprayfoam-insulation", purpose: "Legacy URL support" },
                          { from: "/services/dual-fuel-heating", to: "/services/dual-fuel-heating-systems", purpose: "URL normalization" },
                          { from: "/services/remote-monitoring", to: "/services/peak-thermostat#remote-monitoring", purpose: "Section redirect" },
                          { from: "/services/multi-unit-appliances", to: "/services/urban-yeti-appliances", purpose: "Product rebrand" },
                          { from: "/services/commercial", to: "/services/commercial-services", purpose: "URL normalization" },
                        ].map((redirect) => (
                          <TableRow key={redirect.from}>
                            <TableCell className="font-mono text-sm text-slate-600">{redirect.from}</TableCell>
                            <TableCell><ArrowRight className="h-4 w-4 text-orange-500" /></TableCell>
                            <TableCell className="font-mono text-sm text-[#8dc63f]">{redirect.to}</TableCell>
                            <TableCell className="text-sm text-slate-500">{redirect.purpose}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Dynamic Route Patterns */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    Dynamic Route Patterns
                  </h3>
                  <div className="bg-slate-50 rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-100">
                          <TableHead className="font-semibold">Pattern</TableHead>
                          <TableHead className="font-semibold">Example</TableHead>
                          <TableHead className="font-semibold">Description</TableHead>
                          <TableHead className="font-semibold text-center">Count</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { pattern: "/heat-pump-experts/:slug", example: "/heat-pump-experts/dartmouth", desc: "Mini-split location pages", count: 17 },
                          { pattern: "/solar-experts/:slug", example: "/solar-experts/surrey", desc: "Residential solar location pages", count: 17 },
                          { pattern: "/services/commercial-solar/:slug", example: "/services/commercial-solar/moncton", desc: "Commercial solar location pages", count: 17 },
                          { pattern: "/air-conditioning-experts/:slug", example: "/air-conditioning-experts/halifax", desc: "AC location pages", count: 17 },
                          { pattern: "/blog/:slug", example: "/blog/heat-pump-benefits", desc: "Blog post pages", count: "Dynamic" },
                          { pattern: "/specials/:province", example: "/specials/nova-scotia", desc: "Provincial specials pages", count: 5 },
                        ].map((route) => (
                          <TableRow key={route.pattern}>
                            <TableCell className="font-mono text-sm text-purple-600">{route.pattern}</TableCell>
                            <TableCell className="font-mono text-sm text-slate-500">{route.example}</TableCell>
                            <TableCell className="text-sm">{route.desc}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline">{route.count}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* API Endpoints */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-green-500" />
                    Backend API Endpoints
                  </h3>
                  <div className="bg-slate-50 rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-100">
                          <TableHead className="font-semibold w-20">Method</TableHead>
                          <TableHead className="font-semibold">Endpoint</TableHead>
                          <TableHead className="font-semibold">Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { method: "GET", endpoint: "/api/locations", desc: "Fetch all locations" },
                          { method: "POST", endpoint: "/api/locations", desc: "Create new location" },
                          { method: "DELETE", endpoint: "/api/locations/:id", desc: "Delete a location" },
                          { method: "GET", endpoint: "/api/brands", desc: "Fetch all brands" },
                          { method: "POST", endpoint: "/api/brands", desc: "Create new brand" },
                          { method: "GET", endpoint: "/api/blogs", desc: "Fetch all blog posts" },
                          { method: "POST", endpoint: "/api/blogs", desc: "Create new blog post" },
                          { method: "GET", endpoint: "/api/faqs", desc: "Fetch all FAQs" },
                          { method: "POST", endpoint: "/api/faqs", desc: "Create new FAQ" },
                          { method: "GET", endpoint: "/api/promotions", desc: "Fetch all promotions" },
                          { method: "POST", endpoint: "/api/promotions", desc: "Create new promotion" },
                          { method: "POST", endpoint: "/api/csv/:type", desc: "Bulk import via CSV" },
                        ].map((api, idx) => (
                          <TableRow key={idx}>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={
                                  api.method === "GET" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                  api.method === "POST" ? "bg-green-50 text-green-700 border-green-200" :
                                  api.method === "DELETE" ? "bg-red-50 text-red-700 border-red-200" :
                                  "bg-yellow-50 text-yellow-700 border-yellow-200"
                                }
                              >
                                {api.method}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{api.endpoint}</TableCell>
                            <TableCell className="text-sm text-slate-600">{api.desc}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Environment Info */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-slate-600" />
                    Environment Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg border p-4">
                      <h4 className="font-medium text-sm text-slate-500 mb-2">Database</h4>
                      <p className="font-mono text-sm">PostgreSQL (Neon-backed)</p>
                      <p className="text-xs text-slate-400 mt-1">ORM: Drizzle</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg border p-4">
                      <h4 className="font-medium text-sm text-slate-500 mb-2">Frontend Framework</h4>
                      <p className="font-mono text-sm">React 18 + Vite</p>
                      <p className="text-xs text-slate-400 mt-1">Router: Wouter</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg border p-4">
                      <h4 className="font-medium text-sm text-slate-500 mb-2">Styling</h4>
                      <p className="font-mono text-sm">Tailwind CSS v4 + shadcn/ui</p>
                      <p className="text-xs text-slate-400 mt-1">Animations: Framer Motion</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg border p-4">
                      <h4 className="font-medium text-sm text-slate-500 mb-2">External Booking</h4>
                      <p className="font-mono text-sm">scheduling.greenfootenergy.ca</p>
                      <p className="text-xs text-slate-400 mt-1">All CTAs link externally</p>
                    </div>
                  </div>
                </div>

                {/* Page Stats Summary */}
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-[#8dc63f]" />
                    Site Page Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-[#8dc63f]/10 to-[#8dc63f]/5 rounded-lg border border-[#8dc63f]/20 p-4 text-center">
                      <p className="text-3xl font-bold text-[#8dc63f]">~107</p>
                      <p className="text-sm text-slate-600">Total Pages</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200 p-4 text-center">
                      <p className="text-3xl font-bold text-blue-600">39</p>
                      <p className="text-sm text-slate-600">Static Pages</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg border border-purple-200 p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600">68</p>
                      <p className="text-sm text-slate-600">Dynamic Pages</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg border border-orange-200 p-4 text-center">
                      <p className="text-3xl font-bold text-orange-600">6</p>
                      <p className="text-sm text-slate-600">Redirects</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              CSV Format Guide
            </CardTitle>
            <CardDescription>Example CSV formats for each content type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Locations CSV</h4>
              <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto" data-testid="text-csv-example-locations">
name,slug,city,province,address,postal_code,phone,email,description,service_area
"Vancouver HVAC","vancouver-hvac","Vancouver","BC","123 Main St","V6B 1A1","604-555-0123","info@example.com","Description here","Metro Vancouver"
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2">FAQs CSV</h4>
              <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto" data-testid="text-csv-example-faqs">
question,answer,category,sort_order
"What is a mini-split?","A mini-split is a ductless heating and cooling system...","General",1
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
