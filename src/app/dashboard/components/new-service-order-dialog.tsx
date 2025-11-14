'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type VehicleData = {
  brand: string;
  model: string;
  year: number;
};

export function NewServiceOrderDialog({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchingPlate, setSearchingPlate] = useState(false);
  
  // Dados do veículo
  const [plate, setPlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  
  // Dados do cliente
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  
  // Dados da ordem
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState('');

  const searchPlate = async () => {
    if (!plate || plate.length < 7) {
      toast.error('Digite uma placa válida');
      return;
    }

    setSearchingPlate(true);

    try {
      // Primeiro verifica se o veículo já existe no banco
      const { data: existingVehicle } = await supabase
        .from('vehicles')
        .select('*')
        .eq('plate', plate.toUpperCase())
        .single();

      if (existingVehicle) {
        // Preenche com dados existentes
        setBrand(existingVehicle.brand);
        setModel(existingVehicle.model);
        setYear(existingVehicle.year.toString());
        setColor(existingVehicle.color);
        setCustomerName(existingVehicle.customer_name);
        setCustomerPhone(existingVehicle.customer_phone);
        setCustomerEmail(existingVehicle.customer_email || '');
        toast.success('Veículo encontrado no sistema!');
      } else {
        // Simula consulta à API da FIPE/Detran (em produção, usar API real)
        // Por enquanto, apenas limpa os campos para preenchimento manual
        toast.info('Veículo não encontrado. Preencha os dados manualmente.');
      }
    } catch (error) {
      console.error('Erro ao buscar placa:', error);
      toast.error('Erro ao buscar placa');
    } finally {
      setSearchingPlate(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Criar ou atualizar veículo
      const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .upsert({
          plate: plate.toUpperCase(),
          brand,
          model,
          year: parseInt(year),
          color,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail,
        }, {
          onConflict: 'plate'
        })
        .select()
        .single();

      if (vehicleError) throw vehicleError;

      // 2. Criar ordem de serviço
      const { error: orderError } = await supabase
        .from('service_orders')
        .insert({
          vehicle_id: vehicle.id,
          status: 'pending',
          priority,
          notes,
          total_estimate: 0,
        });

      if (orderError) throw orderError;

      toast.success('Ordem de serviço criada com sucesso!');
      setOpen(false);
      resetForm();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      toast.error('Erro ao criar ordem de serviço');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPlate('');
    setBrand('');
    setModel('');
    setYear('');
    setColor('');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setPriority('medium');
    setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Ordem
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Nova Ordem de Serviço</DialogTitle>
          <DialogDescription className="text-slate-400">
            Preencha os dados do veículo e do cliente
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Busca por Placa */}
          <div className="space-y-2">
            <Label>Placa do Veículo</Label>
            <div className="flex gap-2">
              <Input
                placeholder="ABC-1234"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                maxLength={8}
                required
                className="bg-slate-950/50 border-slate-700 text-white"
              />
              <Button
                type="button"
                onClick={searchPlate}
                disabled={searchingPlate}
                variant="outline"
                className="border-slate-700"
              >
                {searchingPlate ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Dados do Veículo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Marca</Label>
              <Input
                placeholder="Ex: Toyota"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                className="bg-slate-950/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Input
                placeholder="Ex: Corolla"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className="bg-slate-950/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Ano</Label>
              <Input
                type="number"
                placeholder="2023"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className="bg-slate-950/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Cor</Label>
              <Input
                placeholder="Ex: Prata"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                className="bg-slate-950/50 border-slate-700 text-white"
              />
            </div>
          </div>

          {/* Dados do Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados do Cliente</h3>
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input
                placeholder="Nome do cliente"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="bg-slate-950/50 border-slate-700 text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  placeholder="(11) 99999-9999"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  className="bg-slate-950/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Email (opcional)</Label>
                <Input
                  type="email"
                  placeholder="cliente@email.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="bg-slate-950/50 border-slate-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Prioridade e Observações */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Prioridade</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800">
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Observações Iniciais</Label>
              <Textarea
                placeholder="Descreva o problema ou serviço solicitado..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="bg-slate-950/50 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-slate-700"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              {loading ? 'Criando...' : 'Criar Ordem'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
