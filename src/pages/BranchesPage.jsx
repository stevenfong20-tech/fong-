import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '../lib/base44-client';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Store, Phone, MapPin, ChevronRight, Pencil, Trash2, UserPlus } from 'lucide-react';
import { Button } from '../components/button';
import { Card, CardContent } from '../components/card';
import { BranchFormModal } from '../components/BranchFormModal';
import { BranchOrdersDrawer } from '../components/BranchOrdersDrawer';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import { InviteUserModal } from '../components/InviteUserModal';
import { toast } from 'sonner';

export default function BranchesPage() {
  const { t, language } = useLanguage();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editBranch, setEditBranch] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showInvite, setShowInvite] = useState(false);

  const { data: branches = [], isLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: () => base44.entities.Branch.list(),
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: () => base44.entities.Order.list('-created_date', 500),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Branch.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      toast.success(t('deleteSuccess'));
      setDeleteTarget(null);
    },
  });

  const getBranchStats = (branchId) => {
    const branchOrders = orders.filter(o => o.branch_id === branchId);
    const total = branchOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    return { count: branchOrders.length, total };
  };

  const getName = (b) => language === 'zh' ? (b.name_zh || b.name_en) : (b.name_en || b.name_zh);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('branches')}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {language === 'zh' ? `共 ${branches.length} 間分店` : `${branches.length} branches`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowInvite(true)}>
            <UserPlus size={16} className="mr-1.5" /> {language === 'zh' ? '邀請用戶' : 'Invite User'}
          </Button>
          <Button onClick={() => { setEditBranch(null); setShowForm(true); }}>
            <Plus size={16} className="mr-1.5" /> {t('addBranch')}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">{t('loading')}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map(branch => {
            const stats = getBranchStats(branch.id);
            return (
              <Card key={branch.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedBranch(branch)}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Store className="text-primary" size={20} />
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setEditBranch(branch); setShowForm(true); }}>
                        <Pencil size={13} />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={(e) => { e.stopPropagation(); setDeleteTarget(branch); }}>
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-foreground">{getName(branch)}</h3>
                  
                  {branch.address && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin size={11} /> {branch.address}
                    </p>
                  )}
                  {branch.phone && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Phone size={11} /> {branch.phone}
                    </p>
                  )}

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-primary">NT${stats.total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {stats.count} {language === 'zh' ? '筆訂單' : 'orders'}
                      </p>
                    </div>
                    <ChevronRight className="text-muted-foreground" size={16} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {branches.length === 0 && !isLoading && (
        <div className="col-span-full text-center py-16 text-muted-foreground">{t('noBranches')}</div>
      )}

      {showForm && (
        <BranchFormModal
          branch={editBranch}
          onClose={() => setShowForm(false)}
        />
      )}

      {selectedBranch && (
        <BranchOrdersDrawer
          branch={selectedBranch}
          orders={orders.filter(o => o.branch_id === selectedBranch.id)}
          onClose={() => setSelectedBranch(null)}
        />
      )}

      {showInvite && (
        <InviteUserModal
          onClose={() => setShowInvite(false)}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmDialog
          branch={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          isLoading={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
