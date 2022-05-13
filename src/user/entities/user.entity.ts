import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: true,
  })
  lastName: string;

  @Column({
    name: 'address1',
    type: 'varchar',
    nullable: true,
  })
  address1: string;

  @Column({
    name: 'address2',
    type: 'varchar',
    nullable: true,
  })
  address2: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
