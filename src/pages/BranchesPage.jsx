import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '../lib/base44-client';
import { useLanguage } from '../context/LanguageContext'; 
import { Plus, Store, Phone, MapPin, ChevronRight, Pencil, Trash2, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/components/ui/card';
import BranchFormModal from '../components/components/BranchFormModal';
import BranchOrdersDrawer from '../components/components/BranchOrdersDrawer';
import DeleteConfirmDialog from '../components/components/DeleteConfirmDialog';
import InviteUserModal from '../components/components/InviteUserModal';
import { toast } from 'sonner'

  );
}
