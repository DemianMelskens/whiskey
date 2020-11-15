import {Bottle} from '../../../domain/bottle.model';

export interface BottlePageDto {
    bottles: Bottle[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
}
