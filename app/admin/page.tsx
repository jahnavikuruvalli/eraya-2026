"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LogOut, Download, Users, Mail, Loader2, Calendar, User, Phone, Building, GraduationCap, CreditCard } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface Registration {
  id: string
  created_at: string
  event_name: string
  entry_fee: string | null
  full_name: string
  email: string
  phone: string
  college: string
  year: string
  branch: string
  transaction_id: string
}

interface ContactMessage {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  message: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [activeTab, setActiveTab] = useState<"registrations" | "messages">("registrations")
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:45',message:'Admin auth check started',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
    // #endregion
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:47',message:'Admin session check result',data:{hasSession:!!session,hasError:!!sessionError,errorMessage:sessionError?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
      // #endregion
      
      if (!session) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:50',message:'No session - redirecting to login',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
        // #endregion
        router.push("/admin/login")
        return
      }

      // Check if user is admin
      let { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:55',message:'Admin profile check result',data:{hasProfile:!!profile,hasError:!!error,role:profile?.role,errorMessage:error?.message,errorCode:error?.code},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
      // #endregion

      // If profile doesn't exist, create it (fallback)
      if (error && error.code === 'PGRST116' || !profile) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:63',message:'Profile missing - creating fallback profile',data:{userId:session.user.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
        // #endregion
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .upsert({
            id: session.user.id,
            role: 'user',
          }, {
            onConflict: 'id'
          })
          .select('role')
          .single()
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:72',message:'Fallback profile creation result',data:{hasProfile:!!newProfile,hasError:!!createError,errorMessage:createError?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
        // #endregion
        if (createError || !newProfile) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:75',message:'Fallback profile creation failed',data:{errorMessage:createError?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
          // #endregion
          await supabase.auth.signOut()
          router.push("/admin/login")
          return
        }
        profile = newProfile
      }

      if (error || !profile || profile.role !== 'admin') {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:61',message:'Not admin - redirecting to login',data:{role:profile?.role},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
        // #endregion
        await supabase.auth.signOut()
        router.push("/admin/login")
        return
      }

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:67',message:'Auth check passed - fetching data',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
      // #endregion
      setIsAuthenticated(true)
      fetchData()
    } catch (error: any) {
      console.error("Auth check error:", error)
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:70',message:'Auth check exception',data:{errorMessage:error?.message,errorName:error?.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
      // #endregion
      router.push("/admin/login")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchData = async () => {
    setIsFetching(true)
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:77',message:'Fetching admin data started',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
    // #endregion
    try {
      const [regRes, msgRes] = await Promise.all([
        fetch("/api/admin/registrations"),
        fetch("/api/admin/messages"),
      ])
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:81',message:'Admin API responses received',data:{regStatus:regRes.status,regOk:regRes.ok,msgStatus:msgRes.status,msgOk:msgRes.ok},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
      // #endregion

      if (regRes.ok) {
        const regData = await regRes.json()
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:85',message:'Registrations data parsed',data:{hasRegistrations:!!regData.registrations,count:regData.registrations?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
        // #endregion
        setRegistrations(regData.registrations || [])
      } else {
        // #region agent log
        const regErrorData = await regRes.json().catch(()=>({}));
        fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:88',message:'Registrations fetch failed',data:{status:regRes.status,error:regErrorData.error},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
        // #endregion
      }

      if (msgRes.ok) {
        const msgData = await msgRes.json()
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:93',message:'Messages data parsed',data:{hasMessages:!!msgData.messages,count:msgData.messages?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
        // #endregion
        setMessages(msgData.messages || [])
      } else {
        // #region agent log
        const msgErrorData = await msgRes.json().catch(()=>({}));
        fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:97',message:'Messages fetch failed',data:{status:msgRes.status,error:msgErrorData.error},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
        // #endregion
      }
    } catch (error: any) {
      console.error("Fetch error:", error)
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/admin/page.tsx:100',message:'Fetch exception',data:{errorMessage:error?.message,errorName:error?.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
      // #endregion
    } finally {
      setIsFetching(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const exportToCSV = (data: Registration[] | ContactMessage[], filename: string) => {
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((header) => {
          const value = row[header as keyof typeof row]
          return typeof value === "string" && value.includes(",")
            ? `"${value.replace(/"/g, '""')}"`
            : value
        }).join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-maroon">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-maroon fabric-texture">
      {/* Header */}
      <header className="border-b border-gold/20 bg-maroon-dark/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-gold">ERAYA 2026 Admin</h1>
              <p className="text-sm text-cream/60">Dashboard</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-gold/30 bg-transparent px-4 py-2 text-sm text-gold transition-colors hover:bg-gold/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-gold/30 bg-maroon-dark/60 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cream/60">Total Registrations</p>
                <p className="mt-2 font-display text-3xl font-bold text-gold">{registrations.length}</p>
              </div>
              <Users className="h-12 w-12 text-gold/40" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-gold/30 bg-maroon-dark/60 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cream/60">Contact Messages</p>
                <p className="mt-2 font-display text-3xl font-bold text-gold">{messages.length}</p>
              </div>
              <Mail className="h-12 w-12 text-gold/40" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b border-gold/20">
          <button
            onClick={() => setActiveTab("registrations")}
            className={`border-b-2 px-4 py-2 font-display text-sm font-semibold transition-colors ${
              activeTab === "registrations"
                ? "border-gold text-gold"
                : "border-transparent text-cream/60 hover:text-gold"
            }`}
          >
            Registrations ({registrations.length})
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`border-b-2 px-4 py-2 font-display text-sm font-semibold transition-colors ${
              activeTab === "messages"
                ? "border-gold text-gold"
                : "border-transparent text-cream/60 hover:text-gold"
            }`}
          >
            Messages ({messages.length})
          </button>
        </div>

        {/* Export Button */}
        <div className="mb-4 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              exportToCSV(
                activeTab === "registrations" ? registrations : messages,
                `${activeTab}-${new Date().toISOString().split("T")[0]}.csv`
              )
            }
            disabled={isFetching || (activeTab === "registrations" ? registrations.length === 0 : messages.length === 0)}
            className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-display text-maroon-dark transition-all hover:bg-gold-light disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </motion.button>
        </div>

        {/* Content */}
        {isFetching ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : activeTab === "registrations" ? (
          <RegistrationsTable registrations={registrations} />
        ) : (
          <MessagesTable messages={messages} />
        )}
      </div>
    </div>
  )
}

function RegistrationsTable({ registrations }: { registrations: Registration[] }) {
  if (registrations.length === 0) {
    return (
      <div className="rounded-xl border border-gold/30 bg-maroon-dark/60 p-12 text-center">
        <Users className="mx-auto h-12 w-12 text-gold/40" />
        <p className="mt-4 text-cream/60">No registrations yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gold/30 bg-maroon-dark/60">
      <table className="w-full">
        <thead className="border-b border-gold/20 bg-maroon/40">
          <tr>
            <th className="px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-gold">
              Date
            </th>
            <th className="px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-gold">
              Event
            </th>
            <th className="px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-gold">
              Name
            </th>
            <th className="px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-gold">
              Email
            </th>
            <th className="px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-gold">
              Phone
            </th>
            <th className="px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-gold">
              College
            </th>
            <th className="px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wider text-gold">
              Transaction ID
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gold/10">
          {registrations.map((reg) => (
            <tr key={reg.id} className="hover:bg-maroon/20">
              <td className="whitespace-nowrap px-4 py-3 text-sm text-cream">
                {new Date(reg.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-sm text-cream">{reg.event_name}</td>
              <td className="px-4 py-3 text-sm text-cream">{reg.full_name}</td>
              <td className="px-4 py-3 text-sm text-cream">{reg.email}</td>
              <td className="px-4 py-3 text-sm text-cream">{reg.phone}</td>
              <td className="px-4 py-3 text-sm text-cream">{reg.college}</td>
              <td className="px-4 py-3 text-sm font-mono text-gold">{reg.transaction_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MessagesTable({ messages }: { messages: ContactMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-gold/30 bg-maroon-dark/60 p-12 text-center">
        <Mail className="mx-auto h-12 w-12 text-gold/40" />
        <p className="mt-4 text-cream/60">No messages yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-gold/30 bg-maroon-dark/60 p-6"
        >
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="font-display font-semibold text-gold">{msg.name}</h3>
              <p className="text-sm text-cream/60">{msg.email}</p>
              {msg.phone && <p className="text-sm text-cream/60">{msg.phone}</p>}
            </div>
            <span className="text-xs text-cream/40">
              {new Date(msg.created_at).toLocaleString()}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-cream/80">{msg.message}</p>
        </motion.div>
      ))}
    </div>
  )
}


