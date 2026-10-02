import React, { useState } from 'react';
import { SubscriptionAccount } from '../types/futsal';
import {
  X,
  Check,
  Sparkles,
  Shield,
  CreditCard,
  Lock,
  ExternalLink,
  Settings,
  AlertCircle,
  FileText,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Building,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubscriptionModalProps {
  subscription: SubscriptionAccount;
  onUpdateSubscription: (updated: SubscriptionAccount) => void;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  subscription,
  onUpdateSubscription,
  onClose
}) => {
  const [step, setStep] = useState<'plans' | 'checkout' | 'manage' | 'settings'>(
    subscription.status === 'active' || subscription.status === 'trial' ? 'manage' : 'plans'
  );
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(subscription.plan || 'annual');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'impultienda' | 'mercadopago'>('card');

  // Card Checkout Form State
  const [cardHolder, setCardHolder] = useState(subscription.customerName || 'Andres Bertona');
  const [cardEmail, setCardEmail] = useState(subscription.customerEmail || 'abertona@gmail.com');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Gateway URL Configuration (For the App Owner / Merchant)
  const [customGatewayUrl, setCustomGatewayUrl] = useState(
    subscription.gatewayCheckoutUrl || 'https://treinos-de-futsal-infantil.impultienda.ar'
  );
  const [gatewaySavedNotice, setGatewaySavedNotice] = useState(false);

  // Format Card Number (with spaces every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setCardExpiry(raw);
  };

  // Detect Card Brand
  const getCardBrand = (num: string) => {
    const cleaned = num.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (cleaned.startsWith('5')) return 'Mastercard';
    if (cleaned.startsWith('3')) return 'American Express';
    return 'Cartão';
  };

  const planPrice = billingCycle === 'annual' ? 69.90 : 9.90;

  // Process Card Payment
  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    const cleanCard = cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 15) {
      setPaymentError('Por favor, digite um número de cartão de crédito válido (16 dígitos).');
      return;
    }
    if (cardExpiry.length < 5) {
      setPaymentError('Por favor, informe a data de validade no formato MM/AA.');
      return;
    }
    if (cardCvv.length < 3) {
      setPaymentError('Por favor, informe o código de segurança CVC (3 ou 4 dígitos).');
      return;
    }

    setIsProcessing(true);

    // Simulate real gateway transaction tokenization & charge
    setTimeout(() => {
      setIsProcessing(false);
      const nextDate = new Date();
      if (billingCycle === 'annual') {
        nextDate.setFullYear(nextDate.getFullYear() + 1);
      } else {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }

      const updatedAccount: SubscriptionAccount = {
        ...subscription,
        status: 'active',
        plan: billingCycle,
        amountPaid: planPrice,
        currency: 'USD',
        customerName: cardHolder.trim(),
        customerEmail: cardEmail.trim(),
        paymentMethod: 'card',
        cardLast4: cleanCard.slice(-4),
        cardBrand: getCardBrand(cleanCard),
        nextBillingDate: nextDate.toLocaleDateString('pt-BR'),
        trialDaysLeft: 0
      };

      onUpdateSubscription(updatedAccount);
      setStep('manage');

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 1800);
  };

  // Handle External Checkout via ImpulTienda / Mercado Pago
  const handleOpenGatewayCheckout = () => {
    const targetUrl = customGatewayUrl.trim() || 'https://treinos-de-futsal-infantil.impultienda.ar';
    // Open the actual merchant checkout in a new window/tab
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    // Also update account to pending/trial with instruction
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 7);

    const updatedAccount: SubscriptionAccount = {
      ...subscription,
      status: 'trial',
      plan: billingCycle,
      customerName: cardHolder,
      customerEmail: cardEmail,
      paymentMethod: 'impultienda',
      trialDaysLeft: 7,
      trialEndsAt: nextDate.toLocaleDateString('pt-BR'),
      gatewayCheckoutUrl: targetUrl
    };

    onUpdateSubscription(updatedAccount);
  };

  // Cancel Subscription
  const handleCancelSubscription = () => {
    if (confirm('Tem certeza de que deseja cancelar a assinatura? Você voltará ao plano gratuito ao fim do período.')) {
      onUpdateSubscription({
        ...subscription,
        status: 'free',
        cardLast4: undefined,
        cardBrand: undefined
      });
      setStep('plans');
    }
  };

  // Save Custom Gateway URL for the App Owner
  const handleSaveGatewaySettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSubscription({
      ...subscription,
      gatewayCheckoutUrl: customGatewayUrl.trim()
    });
    setGatewaySavedNotice(true);
    setTimeout(() => setGatewaySavedNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-400/40 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Top Header */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 border-b border-slate-800 text-center shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="px-3 py-0.5 bg-amber-400 text-slate-950 font-black text-[11px] rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Futsal Family Club · Pasarela de Suscripción</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            {step === 'manage'
              ? 'Gestão da Sua Assinatura'
              : step === 'checkout'
              ? 'Checkout Seguro de Pagamento'
              : step === 'settings'
              ? 'Configuração do Enlace de Cobro'
              : 'Escolha o Plano da Sua Família'}
          </h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
            {step === 'manage'
              ? 'Status da assinatura, renovação e comprovantes de pagamento.'
              : step === 'checkout'
              ? 'Insira os dados do cartão ou pague via ImpulTienda / Mercado Pago.'
              : step === 'settings'
              ? 'Configure para onde vai o dinheiro das assinaturas dos seus clientes.'
              : 'Acesso ilimitado às 200 fichas, vestíveis e retos semanais para até 5 atletas.'}
          </p>

          {/* Sub-navigation tabs */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            <button
              onClick={() => setStep('plans')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                step === 'plans' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Planos
            </button>
            <button
              onClick={() => setStep('checkout')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                step === 'checkout' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Checkout / Cobrança
            </button>
            {subscription.status !== 'free' && (
              <button
                onClick={() => setStep('manage')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  step === 'manage' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Minha Assinatura
              </button>
            )}
            <button
              onClick={() => setStep('settings')}
              className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors ${
                step === 'settings' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="Configuração do Dono da App"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Configurar Gateway</span>
            </button>
          </div>
        </div>

        {/* STEP 1: PLANS SELECTION */}
        {step === 'plans' && (
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Billing Cycle Switch */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mensal ($9.90 / mês)
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 py-2 rounded-lg font-bold transition-all relative ${
                    billingCycle === 'annual'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Anual ($69.90 / ano)
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-emerald-500 text-slate-950 rounded-full font-black">
                    -41% OFF
                  </span>
                </button>
              </div>
            </div>

            {/* Price Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Free Tier */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Plano Gratuito
                  </div>
                  <div className="text-2xl font-black text-white font-mono">$0</div>
                  <p className="text-xs text-slate-400">
                    Acesso básico para experimentar o método de futsal em família.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Fichas básicas de iniciação</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>1 atleta cadastrado</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-500">
                      <span>✕ Sem conexão direta com vestíveis</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-500">
                      <span>✕ Sem certificado imprimível</span>
                    </li>
                  </ul>
                </div>

                <div className="p-2.5 text-center text-xs font-semibold text-slate-400 bg-slate-900 rounded-xl">
                  {subscription.status === 'free' ? 'Plano Atual' : 'Plano Básico'}
                </div>
              </div>

              {/* Family Club Pro Tier */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-950 border-2 border-amber-400 flex flex-col justify-between space-y-4 relative shadow-xl shadow-amber-500/10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Futsal Family Pro
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                      RECOMENDADO
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white font-mono">${planPrice.toFixed(2)}</span>
                    <span className="text-xs text-slate-400">
                      {billingCycle === 'annual' ? '/ ano completo' : '/ mês'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    Experiência completa com 200 fichas, vestíveis e retos para toda a família.
                  </p>

                  <ul className="space-y-2 text-xs text-slate-200 pt-2 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Todas as 200 fichas dos 3 livros</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Até 5 atletas da família com fotos reais</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Web Bluetooth + Acelerômetro em tempo real</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Diário mensal e Certificado Fair Play oficial</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-amber-400/20"
                >
                  <span>Avançar para Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: REAL CHECKOUT FORM */}
        {step === 'checkout' && (
          <div className="p-6 space-y-5 overflow-y-auto flex-1">
            {/* Summary Banner */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white">
                  Plano Selecionado: {billingCycle === 'annual' ? 'Futsal Family Pro Anual' : 'Futsal Family Pro Mensal'}
                </span>
                <div className="text-[11px] text-slate-400">
                  Cobrança recorrente {billingCycle === 'annual' ? 'anual' : 'mensal'}. Cancele quando quiser.
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black font-mono text-amber-400">${planPrice.toFixed(2)}</div>
                <button
                  onClick={() => setStep('plans')}
                  className="text-[10px] text-slate-400 hover:underline"
                >
                  Trocar plano
                </button>
              </div>
            </div>

            {/* Error Message */}
            {paymentError && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 rounded-xl text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{paymentError}</span>
              </div>
            )}

            {/* Payment Method Switcher */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all font-semibold ${
                  paymentMethod === 'card'
                    ? 'bg-amber-400/10 border-amber-400 text-white shadow'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Cartão de Crédito / Débito</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('impultienda')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all font-semibold ${
                  paymentMethod === 'impultienda'
                    ? 'bg-amber-400/10 border-amber-400 text-white shadow'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Building className="w-4 h-4 text-emerald-400" />
                <span>ImpulTienda / Mercado Pago</span>
              </button>
            </div>

            {/* OPTION A: CREDIT / DEBIT CARD FORM */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleProcessPayment} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Nome completo como está no cartão"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block">
                    E-mail para Fatura e Recibo
                  </label>
                  <input
                    type="email"
                    value={cardEmail}
                    onChange={(e) => setCardEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block">
                    Número do Cartão
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      className="w-full pl-3 pr-16 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-amber-400 uppercase">
                      {cardNumber ? getCardBrand(cardNumber) : 'VISA/MC'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">
                      Validade (MM/AA)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="12/28"
                      maxLength={5}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">
                      Código CVC / CVV
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-700 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 active:scale-98 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    {isProcessing ? 'Processando Cobrança Bancária...' : `Pagar $${planPrice.toFixed(2)} & Ativar Família Pro`}
                  </span>
                </button>
              </form>
            )}

            {/* OPTION B: IMPULTIENDA / MERCADO PAGO GATEWAY LINK */}
            {paymentMethod === 'impultienda' && (
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">
                    Checkout Oficial ImpulTienda / Mercado Pago
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Você será redirecionado para a página segura de pagamento da loja oficial (com suporte a PIX, Boleto, Cartões Locais e Mercado Pago).
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 break-all">
                  🔗 {customGatewayUrl || 'https://treinos-de-futsal-infantil.impultienda.ar'}
                </div>

                <button
                  type="button"
                  onClick={handleOpenGatewayCheckout}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-98"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ir para o Checkout da ImpulTienda ($ {planPrice.toFixed(2)})</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: SUBSCRIPTION MANAGEMENT (When already subscribed) */}
        {step === 'manage' && (
          <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
            <div className="p-5 bg-gradient-to-r from-emerald-950/40 to-slate-950 rounded-2xl border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Assinatura Ativa</span>
                </span>
                <span className="font-mono text-white font-bold">
                  ${subscription.amountPaid.toFixed(2)} / {subscription.plan === 'annual' ? 'ano' : 'mês'}
                </span>
              </div>

              <div>
                <div className="font-bold text-white text-sm">Futsal Family Club Pro</div>
                <div className="text-slate-400 mt-0.5">
                  Titular: <span className="text-white">{subscription.customerName}</span> (
                  {subscription.customerEmail})
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Forma de Pagamento</span>
                  <span className="font-semibold text-white">
                    {subscription.paymentMethod === 'card'
                      ? `${subscription.cardBrand || 'Cartão'} terminado em •••• ${subscription.cardLast4 || '4242'}`
                      : 'ImpulTienda / Mercado Pago'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Próxima Renovação</span>
                  <span className="font-semibold text-white">{subscription.nextBillingDate || 'Em 1 ano'}</span>
                </div>
              </div>
            </div>

            {/* Actions for customer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setStep('checkout')}
                className="p-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl border border-slate-800 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                <span>Atualizar Cartão</span>
              </button>

              <button
                onClick={handleCancelSubscription}
                className="p-3 bg-slate-950 hover:bg-red-950/30 text-red-400 hover:text-red-300 rounded-xl border border-slate-800 hover:border-red-500/30 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancelar Assinatura</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GATEWAY CONFIGURATION FOR APP OWNER */}
        {step === 'settings' && (
          <form onSubmit={handleSaveGatewaySettings} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-400" />
                <span>Configuração do Vendedor / Dono do Aplicativo</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Aqui você define o link de pagamento da sua loja no <strong>ImpulTienda</strong>, <strong>Mercado Pago</strong> ou <strong>Hotmart/Stripe</strong>. Quando seus clientes clicarem em comprar na app, serão enviados diretamente para o seu link onde o dinheiro cai na sua conta.
              </p>
            </div>

            {gatewaySavedNotice && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Enlace de cobro atualizado com sucesso!</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400 block">
                URL Direta de Checkout (Sua Loja / Pasarela)
              </label>
              <input
                type="url"
                value={customGatewayUrl}
                onChange={(e) => setCustomGatewayUrl(e.target.value)}
                placeholder="https://treinos-de-futsal-infantil.impultienda.ar/checkout"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                required
              />
              <span className="text-[10px] text-slate-500 block">
                Exemplo: Link do seu produto na ImpulTienda, link de assinatura do Mercado Pago ou link do Stripe Checkout.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow"
            >
              Salvar Enlace de Cobro
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center shrink-0">
          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" /> Criptografia Bancária SSL 256-bit
            </span>
            <span>·</span>
            <span>Garantia de 30 Dias</span>
            <span>·</span>
            <span>Suporte Familiar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
