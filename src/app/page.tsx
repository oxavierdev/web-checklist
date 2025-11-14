'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Wrench, 
  Car, 
  ClipboardList, 
  Camera, 
  MessageSquare,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Smartphone,
  ArrowRight,
  Star
} from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const features = [
    {
      icon: ClipboardList,
      title: 'Checklist Digital',
      description: 'Inspeções completas com registros detalhados de cada veículo'
    },
    {
      icon: Camera,
      title: 'Fotos e Vídeos',
      description: 'Documente avarias e serviços com evidências visuais'
    },
    {
      icon: MessageSquare,
      title: 'Integração WhatsApp',
      description: 'Envie orçamentos e relatórios direto pelo WhatsApp'
    },
    {
      icon: Users,
      title: 'Gestão de Equipe',
      description: 'Acompanhe o trabalho de cada mecânico em tempo real'
    },
    {
      icon: Clock,
      title: 'Agendamentos',
      description: 'Organize horários e priorize atendimentos'
    },
    {
      icon: TrendingUp,
      title: 'Relatórios',
      description: 'Análises e estatísticas para melhorar seu negócio'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Transparência Total',
      description: 'Registre o estado do veículo na entrada e evite desentendimentos'
    },
    {
      icon: CheckCircle,
      title: 'Profissionalismo',
      description: 'Ordens de serviço padronizadas e profissionais'
    },
    {
      icon: Smartphone,
      title: 'Mobile e Desktop',
      description: 'Acesse de qualquer dispositivo, em qualquer lugar'
    }
  ];

  const stats = [
    { value: '500+', label: 'Oficinas Ativas' },
    { value: '10k+', label: 'Veículos Atendidos' },
    { value: '98%', label: 'Satisfação' },
    { value: '24/7', label: 'Suporte' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-3xl mb-8 shadow-2xl animate-pulse">
              <Wrench className="w-20 h-20 text-white" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AutoCheck Pro
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 mb-4">
              Sistema Completo de Gestão para Oficinas Mecânicas
            </p>
            
            <p className="text-lg text-slate-400 mb-10 max-w-2xl">
              Organize seu fluxo de trabalho, aumente a transparência com clientes e 
              melhore a comunicação da sua equipe com tecnologia profissional
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => router.push('/login')}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-6 text-lg shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:shadow-orange-500/50 hover:scale-105"
              >
                Acessar Sistema
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-700 text-white hover:bg-slate-800 px-8 py-6 text-lg"
              >
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar sua oficina com eficiência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 p-3 rounded-xl w-fit mb-4">
                    <feature.icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Por Que Escolher o AutoCheck Pro?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Benefícios que transformam sua oficina
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl">
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-400 text-lg">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Simples, rápido e eficiente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '1', title: 'Cadastro do Veículo', desc: 'Registre placa e dados do cliente' },
              { step: '2', title: 'Inspeção Visual', desc: 'Documente com fotos e vídeos' },
              { step: '3', title: 'Orçamento', desc: 'Crie e envie via WhatsApp' },
              { step: '4', title: 'Acompanhamento', desc: 'Monitore status em tempo real' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              O Que Dizem Nossos Clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'João Silva', role: 'Proprietário - Auto Center Silva', text: 'Revolucionou nossa oficina! Agora temos controle total de tudo.' },
              { name: 'Maria Santos', role: 'Gerente - Oficina Premium', text: 'A transparência com os clientes melhorou 100%. Recomendo!' },
              { name: 'Carlos Oliveira', role: 'Mecânico - Speed Motors', text: 'Muito mais organizado. Sei exatamente o que fazer a cada momento.' }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Pronto Para Transformar Sua Oficina?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de oficinas que já modernizaram sua gestão
              </p>
              <Button
                size="lg"
                onClick={() => router.push('/login')}
                className="bg-white text-orange-600 hover:bg-slate-100 font-semibold px-10 py-6 text-lg shadow-xl transition-all duration-300 hover:scale-105"
              >
                Começar Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">AutoCheck Pro</p>
                <p className="text-slate-400 text-sm">Sistema de Gestão para Oficinas</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm">
                © 2024 AutoCheck Pro. Todos os direitos reservados.
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Desenvolvido com tecnologia de ponta
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
