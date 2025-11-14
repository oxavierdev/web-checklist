'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getProfile, signOut } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wrench, 
  Car, 
  ClipboardList, 
  Users, 
  LogOut,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { NewServiceOrderDialog } from './components/new-service-order-dialog';
import { Toaster } from 'sonner';

type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'mechanic' | 'receptionist';
};

type ServiceOrder = {
  id: string;
  vehicle_id: string;
  status: string;
  priority: string;
  entry_date: string;
  total_estimate: number;
  vehicles: {
    plate: string;
    brand: string;
    model: string;
    customer_name: string;
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
    total: 0
  });

  useEffect(() => {
    checkAuth();
    loadServiceOrders();
  }, []);

  const checkAuth = async () => {
    const { user } = await getCurrentUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    const { data } = await getProfile(user.id);
    if (data) {
      setProfile(data as Profile);
    }
    setLoading(false);
  };

  const loadServiceOrders = async () => {
    const { data, error } = await supabase
      .from('service_orders')
      .select(`
        *,
        vehicles (
          plate,
          brand,
          model,
          customer_name
        )
      `)
      .order('entry_date', { ascending: false })
      .limit(10);

    if (data) {
      setServiceOrders(data as ServiceOrder[]);
      
      // Calcular estatísticas
      const pending = data.filter(o => o.status === 'pending').length;
      const inProgress = data.filter(o => o.status === 'in_progress').length;
      const completed = data.filter(o => o.status === 'completed').length;
      
      setStats({
        pending,
        inProgress,
        completed,
        total: data.length
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Pendente', variant: 'secondary' },
      in_progress: { label: 'Em Andamento', variant: 'default' },
      waiting_approval: { label: 'Aguardando Aprovação', variant: 'outline' },
      approved: { label: 'Aprovado', variant: 'default' },
      completed: { label: 'Concluído', variant: 'default' },
      cancelled: { label: 'Cancelado', variant: 'destructive' }
    };

    const status_info = statusMap[status] || { label: status, variant: 'outline' };
    return <Badge variant={status_info.variant}>{status_info.label}</Badge>;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'text-green-400',
      medium: 'text-yellow-400',
      high: 'text-orange-400',
      urgent: 'text-red-400'
    };
    return colors[priority] || 'text-slate-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Toaster position="top-right" theme="dark" />
      
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AutoCheck Pro</h1>
                <p className="text-sm text-slate-400">Gestão de Oficina</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{profile?.full_name}</p>
                <p className="text-xs text-slate-400 capitalize">{profile?.role}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Pendentes</CardDescription>
              <CardTitle className="text-3xl text-white">{stats.pending}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-yellow-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Aguardando início</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Em Andamento</CardDescription>
              <CardTitle className="text-3xl text-white">{stats.inProgress}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-blue-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Sendo executados</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Concluídos</CardDescription>
              <CardTitle className="text-3xl text-white">{stats.completed}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Finalizados</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Total de Ordens</CardDescription>
              <CardTitle className="text-3xl text-white">{stats.total}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-slate-400">
                <ClipboardList className="w-4 h-4" />
                <span className="text-sm">Todas as ordens</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="orders" className="data-[state=active]:bg-orange-500">
              <ClipboardList className="w-4 h-4 mr-2" />
              Ordens de Serviço
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="data-[state=active]:bg-orange-500">
              <Car className="w-4 h-4 mr-2" />
              Veículos
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-orange-500">
              <Users className="w-4 h-4 mr-2" />
              Equipe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Ordens de Serviço Recentes</h2>
              <NewServiceOrderDialog onSuccess={loadServiceOrders} />
            </div>

            <div className="grid gap-4">
              {serviceOrders.length === 0 ? (
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <AlertCircle className="w-12 h-12 text-slate-600 mb-4" />
                    <p className="text-slate-400 text-center">
                      Nenhuma ordem de serviço encontrada.<br />
                      Clique em "Nova Ordem" para começar.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                serviceOrders.map((order) => (
                  <Card key={order.id} className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Car className="w-5 h-5 text-orange-500" />
                            <h3 className="text-lg font-semibold text-white">
                              {order.vehicles.brand} {order.vehicles.model}
                            </h3>
                            <Badge variant="outline" className="text-slate-300">
                              {order.vehicles.plate}
                            </Badge>
                          </div>
                          <p className="text-slate-400 mb-2">Cliente: {order.vehicles.customer_name}</p>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(order.status)}
                            <span className={`text-sm font-medium ${getPriorityColor(order.priority)}`}>
                              Prioridade: {order.priority}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            R$ {order.total_estimate.toFixed(2)}
                          </p>
                          <p className="text-sm text-slate-400">
                            {new Date(order.entry_date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="vehicles">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Veículos Cadastrados</CardTitle>
                <CardDescription className="text-slate-400">
                  Gerencie todos os veículos da oficina
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-center py-8">
                  Funcionalidade em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Equipe da Oficina</CardTitle>
                <CardDescription className="text-slate-400">
                  Gerencie mecânicos e funcionários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-center py-8">
                  Funcionalidade em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
