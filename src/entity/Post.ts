import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryColumn('int')
  id: number;

  @Column('varchar')
  title: string;

  @Column('text')
  content: string;

  constructor(attributes: Partial<Post>) {
    Object.assign(this, attributes);
  }
}
