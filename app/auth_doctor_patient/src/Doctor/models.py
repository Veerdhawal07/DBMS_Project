from sqlmodel import SQLModel , Field , Column
import sqlalchemy.dialects.postgresql as pg
import uuid
class Doctor(SQLModel , table=True):
    __tablename__ = "Doctor_CRUD"
    uid : uuid.UUID = Field(
        sa_column=Column(
            pg.UUID,
            primary_key=True,
            
        )
    )