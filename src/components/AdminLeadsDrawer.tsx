import React, { useState, useEffect } from 'react';
import { getStoredLeads } from '../data/academyData';
import { LeadSubmission } from '../types';
import { Database, X, Download, Trash2, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AdminLeadsDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leads, setLeads] = useState<LeadSubmission[]>([]);

  const refresh = () => {
    setLeads(getStoredLeads());
  };

  useEffect(() => {
    if (isOpen) {
      refresh();
    }
  }, [isOpen]);

  const clearLeads = () => {
    if (confirm('저장된 리드 목록을 초기화하시겠습니까?')) {
      localStorage.removeItem('ilac_academy_leads');
      setLeads([]);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) {
      alert('내보낼 리드 데이터가 없습니다.');
      return;
    }
    const headers = ['ID', 'Type', 'Timestamp', 'Name', 'Phone', 'Email', 'Category', 'Target Date', 'Family Members', 'Notes'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${l.type}"`,
      `"${l.timestamp}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.category || ''}"`,
      `"${l.targetVisitDate || ''}"`,
      `"${l.familyMembers || ''}"`,
      `"${(l.questionOrNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ILAC_ACADEMY_LEADS_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 px-3 py-2 bg-[#17171d]/90 hover:bg-[#23232b] text-[#c5a880] border border-[#c5a880]/30 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-mono transition-all hover:scale-105"
        title="Google Sheets & Lead Database Sync Status"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Sync Log</span>
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-[#0f0f13] border-l border-[#c5a880]/30 h-full flex flex-col justify-between shadow-2xl overflow-hidden">
            {/* Top */}
            <div className="p-5 bg-[#16161b] border-b border-[#25242b] flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-[#fbf9f5] font-editorial-serif">
                <Database className="w-4 h-4 text-[#c5a880]" />
                <span>Google Sheets 연동 / 수집 리드 실시간 버퍼</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={refresh}
                  className="p-1.5 rounded text-[#9b9487] hover:text-[#fbf9f5] hover:bg-[#222128]"
                  title="새로고침"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded text-[#9b9487] hover:text-[#fbf9f5] hover:bg-[#222128]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Middle Leads List */}
            <div className="p-5 overflow-y-auto flex-1 space-y-3">
              <div className="p-3 rounded-lg bg-[#141419] border border-[#26252d] text-xs text-[#9b9487] leading-relaxed">
                홈페이지의 [아카데미 RSVP], [Q&A 질문], [TAT 신청], [정착 상담] 신청 데이터가 구글 스프레드시트 웹훅과 로컬 버퍼에 실시간 저장됩니다.
              </div>

              {leads.length === 0 ? (
                <div className="py-20 text-center text-xs text-[#6e685f] space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-[#44423d]" />
                  <p>아직 수집된 신청 내역이 없습니다.</p>
                  <p className="text-[10px]">홈페이지 폼에서 테스트 제출을 진행해 보세요.</p>
                </div>
              ) : (
                leads.map((lead) => (
                  <div key={lead.id} className="p-4 rounded-xl bg-[#15151b] border border-[#292832] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#c5a880]">
                      <span className="px-2 py-0.5 rounded bg-[#c5a880]/15 font-bold uppercase">{lead.type}</span>
                      <span className="text-[#7c756b]">{new Date(lead.timestamp).toLocaleString()}</span>
                    </div>

                    <div className="font-semibold text-[#fbf9f5] text-sm">
                      {lead.name} · <span className="font-mono text-xs text-[#c5a880]">{lead.phone}</span>
                    </div>

                    <div className="text-[#a8a193]">
                      이메일: <span className="text-white">{lead.email}</span>
                      {lead.category && <> · 분야: <span className="text-[#dcd6ca]">{lead.category}</span></>}
                    </div>

                    {lead.questionOrNotes && (
                      <div className="p-2 rounded bg-[#0e0e12] text-[#b5aea2] text-[11px] leading-relaxed">
                        {lead.questionOrNotes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-[#141419] border-t border-[#23222a] flex items-center justify-between gap-3">
              <button
                onClick={clearLeads}
                disabled={leads.length === 0}
                className="px-3 py-2 text-xs text-[#f87171] hover:bg-[#2c1818] rounded flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>데이터 비우기</span>
              </button>

              <button
                onClick={exportCSV}
                disabled={leads.length === 0}
                className="px-4 py-2 text-xs font-bold text-[#0d0d10] bg-[#c5a880] hover:bg-[#d8be96] rounded flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV 스프레드시트 내보내기 ({leads.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
