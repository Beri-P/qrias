import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ContentType {
  VIDEO = 'video',
  ARTICLE = 'article',
  AUDIO = 'audio',
  LIVE = 'live',
}
export enum ContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('content')
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ContentType })
  type: ContentType;

  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: ContentStatus;

  @Column({ nullable: true })
  mediaUrl: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  publishedAt: Date;

  @ManyToOne(() => User, { eager: false, nullable: true })
  author: User;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
