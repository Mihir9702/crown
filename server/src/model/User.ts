import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Post } from './Post'

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
  @Column({ type: 'text' })
  nameid!: string

  @Field()
  @Column({ unique: true })
  userid!: number

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  likes!: number

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, post => post.owner)
  posts?: Post[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
