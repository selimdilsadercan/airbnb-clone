## ROADMAP

- [x] shadcn init
- [x] prettierrc, prettierignore
- [x] html, body, :root thing
- [x] add env to gitignore
- [x] install axios
- [ ] install button input

- [x] create clerk project https://dashboard.clerk.com/
- [x] npm i @clerk/nextjs
- [x] add clerk provider
- [x] add middleware
- [x] add .env shits https://clerk.com/docs/quickstarts/nextjs#update-your-environment-variables
- [x] add auth files

- [ ] install next-themes https://ui.shadcn.com/docs/dark-mode/next
- [ ] add theme provider
- [ ] add suppressHydrationWarning to html tag
- [ ] create toggle button to switch

- [*] install react-hot-toast
- [*] add toast provider

- [ ] create planetscale db https://app.planetscale.com/
- [ ] press connect -> create new password -> copy files
- [x] npm i -D prisma
- [x] npm i @prisma/client
- [x] npx prisma init
- [ ] schemaları oluştur
- [ ] npx prisma generate
- [ ] npx prisma db push
- [ ] create db.ts https://github.com/selimdilsadercan/udemy-clone/blob/main/lib/db.ts

- [x] npm i @tanstack/react-query
- [ ] add query provider [link](#queryprovider)
- [-] create mutations

- [ ] install react-hook-form
- [ ] install zod
- [ ] install shadcn-ui@latest add form
- [ ] import { z } from "zod";
- [ ] import { useForm } from "react-hook-form";
- [ ] import { zodResolver } from "@hookform/resolvers/zod";
- [ ] create schema [link](#schema)
- [ ] create useform [link](#useform)
- [ ] create form [link](#form)

- [x] create uploadthing project https://uploadthing.com/dashboard
- [x] copy api keys
- [x] npm i uploadthing @uploadthing/react
- [x] create lib/uploadthing.ts
- [ ] create /api/uploadthing/core.ts and set endpoints
- [x] create /api/uploadthing/route.ts
- [x] extend middleware with = publicRoutes: ["/api/uploadthing"]
- [x] extend next.config.js with = images: { domains: ["utfs.io"] }
- [x] update tailwind.config.js with = withUt() = const { withUt } = require("uploadthing/tw");
- [x] update globals.css with = @import "~@uploadthing/react/styles.css";
- [ ] create file-upload.tsx component

- [ ] npx shadcn-ui@latest add dialog
- [-] solve hydration problem
- [ ] npm i zustand
- [ ] create use-modal store
- [ ] create modal provider

- [ ] npm i uuid
- [ ] npm i -D @types/uuid
- [-] import { v4 as uuid } from "uuid";

- [ ] add "postinstall": "prisma generate" to package.json
- [ ] gh create repo
- [ ] vercel
- [ ] add .env tokens to vercel
- [ ] redoploy

- [ ] npm i socket.io
- [ ] npm i socket.io-client
- [ ] create NextApiResponseServerIo type
- [ ] create pages/api/socket/io.ts
- [ ] create socket-provider
- [ ] create socket-indicator

- [ ] npm i emoji-mart
- [ ] npm i @emoji-mart/react
- [ ] npm i @emoji-mart/data

- [ ] npm i livekit-server-sdk livekit-client @livekit/components-react @livekit/components-styles --save
- [ ] copy NEXT_PUBLIC_LIVEKIT_SERVER_URL https://docs.livekit.io/realtime/quickstarts/nextjs-13/
- [ ] generate apı key and secret
- [ ] create api/livekit/route.ts
- [ ] create media-room.tsx

---

---

#### useForm

const form = useForm({
defaultValues: { name: "", imageUrl: "" },
resolver: zodResolver(schema),
})
type Form = z.infer<typeof schema>

---

#### schema

const schema = z.object({
name: z.string().min(1, { message: "Server name is required" }),
imageUrl: z.string().url({ message: "Invalid image URL" }),
})

---

#### QueryProvider

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function QueryProvider({ children }: { children: React.ReactNode }) {
const queryClient = new QueryClient();

return (
<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
}

export default QueryProvider;

---

#### mutation

const { mutate: createCourse, isLoading: isEnrolling } = useMutation({
mutationFn: async () => {
const response = await axios.post(`/api/courses/${courseId}/checkout`);
return response.data;
},
onError: (err) => {
console.log("[COURSE_CHECKOUT]", err);
toast.error("Failed to enroll");
},
onSuccess: (data) => {
window.location.assign(data.url);
},
});

---

#### form

<Form {...form}>
  <form
    onSubmit={(e) => onSubmit(e, form.getValues())}
    className="space-y-4 mt-4"
  >
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input {...field} type="text" placeholder="Category" />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />

    <div className="flex items-center gap-x-2">
      <Button disabled={!isValid || isSubmitting || isLoading} type="submit">
        Save
      </Button>
    </div>

  </form>
</Form>;
