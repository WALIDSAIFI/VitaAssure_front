export enum StatutPriseEnCharge {
    EN_ATTENTE = 'EN_ATTENTE',
    VALIDEE = 'VALIDEE',
    REJETEE = 'REJETEE'
  }
  
  export interface PriseEnCharge {
    id: number;
    utilisateurId: number;
    description: string;
    montantEstime: number;
    dateDemande: string; // ou Date si vous convertissez
    statut: StatutPriseEnCharge;
    commentaire?: string; // Optionnel
  }
  
  export interface PriseEnChargeForm {
    description: string;
    montantEstime: number;
    dateDemande: string;
    commentaire?: string;
    statut?: StatutPriseEnCharge;
  }