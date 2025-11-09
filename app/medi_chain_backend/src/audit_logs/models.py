from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
import uuid


class AuditLog(SQLModel, table=True):
    __tablename__ = "audit_logs"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    actor_id: uuid.UUID = Field(nullable=False)
    action: str = Field(max_length=100)
    target_type: str = Field(max_length=50)
    target_id: Optional[uuid.UUID] = Field(default=None)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = Field(default=None, max_length=100)

    def __repr__(self):
        return f"<AuditLog: {self.id}>"