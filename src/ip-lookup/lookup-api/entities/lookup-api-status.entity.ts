import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { LookupApiStatus } from '../lookup-api-status';
import { LookupApiName } from '../lookup-api-name';

@Entity()
@Unique(['apiName'])
export class LookupApiStatusEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn({
    type: 'enum',
    enum: LookupApiName,
  })
  apiName: LookupApiName;

  @Column({
    type: 'enum',
    enum: LookupApiStatus,
    default: LookupApiStatus.OK,
  })
  status: LookupApiStatus;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
