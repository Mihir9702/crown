import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Post } from './Post'
import { Reply } from './Reply'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ type: 'text' })
  username!: string

  @Field()
  @Column({ type: 'text' })
  password!: string

  @Field()
  @Column()
  userId!: number

  @Field()
  @Column({ type: 'text' })
  displayName!: string

  @Field()
  @Column({ type: 'boolean' })
  status!: boolean

  @OneToMany(() => Post, post => post.userId)
  posts?: Post[]

  @OneToMany(() => Reply, reply => reply.userId)
  replies?: Reply

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
