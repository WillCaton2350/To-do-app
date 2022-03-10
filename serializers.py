from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        # this will serialize the data so we can send it to our front end
        fields = ('id', 'title', 'description', 'completed')