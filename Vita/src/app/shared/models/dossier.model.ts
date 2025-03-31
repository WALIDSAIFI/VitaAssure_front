export interface Dossier {
    utilisateurId: number;
    typeTraitement: 'DENTAIRE' | 'OPTIQUE' | 'GENERALISTE' | 'SPECIALISTE' | 'HOSPITALISATION';
    commentaire: string;
    totalFrais: number;
  }